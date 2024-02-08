#!/bin/bash
# install with pip install flaky-tests-detection
flaky --junit-files reports/ --grouping-option=runs --window-size=2 --window-count=5 --top-n=5
