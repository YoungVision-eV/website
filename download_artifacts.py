import pathlib
import shutil
import sys
import tempfile


import backoff
from rich.progress import track, Progress

import requests

ARTIFACTS_URL = sys.argv[1]
GITHUB_TOKEN = sys.argv[2]
ARTIFACT_NAME = sys.argv[3]
try:
    BRANCH = sys.argv[4]
except IndexError:
    BRANCH = "main"

HEADERS = {
    "X-GitHub-Api-Version": "2022-11-28",
    "Accept": "application/vnd.github+json",
    "Authorization": f"Bearer {GITHUB_TOKEN}",
}


def gather_all_archive_urls():
    page = 0
    archives = []
    with Progress() as progress:
        progress.add_task(description="Collecting artifacts", total=None)
        while True:
            page += 1
            print("Downloading page", page)
            response = requests.get(
                ARTIFACTS_URL + f"?per_page=100&page={page}", headers=HEADERS
            )
            data = response.json()
            if not data["artifacts"]:
                break
            for artifact in data["artifacts"]:
                if (
                    BRANCH != "ALL"
                    and artifact["workflow_run"]["head_branch"] != BRANCH
                ):
                    continue
                if artifact["name"] != ARTIFACT_NAME:
                    continue
                archives.append(artifact["archive_download_url"])
    return archives


TEMP_DIR = pathlib.Path(tempfile.mkdtemp(prefix="playwright-reports"))
OUTPUT_DIR = pathlib.Path(__file__).parent / "reports"
if not OUTPUT_DIR.exists():
    OUTPUT_DIR.mkdir()


@backoff.on_exception(backoff.expo, requests.exceptions.RequestException)
def download_archive(download_url, suffix):
    artifact_response = requests.get(
        download_url,
        headers=HEADERS,
    )
    artifact_response.raise_for_status()
    filepath = TEMP_DIR / f"{ARTIFACT_NAME}-{suffix}.zip"
    with open(filepath, "wb") as f:
        f.write(artifact_response.content)
    return filepath


def main():
    archives = []
    for i, download_url in enumerate(
        track(gather_all_archive_urls(), description="Downloading artifacts")
    ):
        archives.append(download_archive(download_url, suffix=i))

    for i, archive_path in enumerate(track(archives, description="Unpacking")):
        shutil.unpack_archive(archive_path, TEMP_DIR)
        shutil.move(TEMP_DIR / "playwright-results.xml",
                    f"./reports/report{i}.xml")
    return archives


if __name__ == "__main__":
    archives = main()
    print(f"unpacked {len(archives)} artifacts")
