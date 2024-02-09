import pathlib
import shutil
import sys
import tempfile

import requests

ARTIFACTS_URL = sys.argv[1]
GITHUB_TOKEN = sys.argv[2]
ARTIFACT_NAME = sys.argv[3]
try:
    BRANCH = sys.argv[4]
except IndexError:
    BRANCH = "main"


page = 1
response = requests.get(ARTIFACTS_URL + '?per_page=100', headers={
    "X-GitHub-Api-Version": "2022-11-28",
    "Accept": "application/vnd.github+json",
    "Authorization": f"Bearer {GITHUB_TOKEN}"
})
data = response.json()
i = 0

# TODO: read more pages

TEMP_DIR = pathlib.Path(tempfile.mkdtemp(prefix="playwright-reports"))
OUTPUT_DIR = pathlib.Path(__file__).parent / "reports"
if not OUTPUT_DIR.exists():
    OUTPUT_DIR.mkdir()

archives = []
for artifact in data["artifacts"]:
    if BRANCH != "ALL" and artifact["workflow_run"]["head_branch"] != BRANCH:
        continue
    download_url = artifact["archive_download_url"]
    artifact_name = artifact["name"]
    if artifact_name != ARTIFACT_NAME:
        continue
    print("Artifact download url:", download_url)
    artifact_response = requests.get(
        download_url,
        headers={"Authorization": f"token {GITHUB_TOKEN}"},
    )
    print("Artifact download status code:", artifact_response.status_code)
    if artifact_response.status_code == 200:
        filepath = TEMP_DIR / f"{artifact_name}-{i}.zip"
        with open(filepath, "wb") as f:
            f.write(artifact_response.content)
        i += 1
        archives.append(filepath)
        print(f"wrote file {filepath}")

for i, archive_path in enumerate(archives):
    shutil.unpack_archive(archive_path, TEMP_DIR)
    shutil.move(TEMP_DIR / "playwright-results.xml", f"./reports/report{i}.xml")

print(f"unpacked {len(archives)} artifacts")
