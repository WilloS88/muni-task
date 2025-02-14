#!/usr/bin/env python3
# Python 3.10.4

import os
import json
from github import Github
from dotenv import load_dotenv

load_dotenv()

token = os.getenv("GITHUB_TOKEN")
if not token:
    raise ValueError("Not set up GITHUB_TOKEN")

g = Github(token)

repo = g.get_repo("cloudnative-pg/cloudnative-pg")

issues = repo.get_issues(state="all")

result = []

for issue in issues:
    if issue.pull_request:
        continue

    first_message = issue.body or ""
    comments = issue.get_comments()
    messages_list = []

    if first_message.strip():
        messages_list.append(first_message.strip())

    for comment in comments:
        username = comment.user.login.lower()
        if "bot" in username:
            continue
        messages_list.append(comment.body.strip())

    messages_markdown = "\n---\n".join(messages_list)

    state = issue.state if len(messages_list) > 1 else "no reaction"
    
    result.append({
        "title": issue.title,
        "id": issue.number,
        "state": state,
        "first": first_message,
        "messages": messages_markdown
    })

with open("issues.json", "w", encoding="utf-8") as f:
    json.dump(result, f, ensure_ascii=False, indent=4)
