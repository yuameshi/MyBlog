---
title: 增加博客Push更新自动推送到TG频道(通过TG机器人)
date: 2022-01-01 09:07:08
tags:
 - 开发
---
# 首先给大家说一声`新年好！`

现在是新年第一天呢！

第一天就开始折腾，真的累（

~~做了两个小时做好之后才发现GitHub有官方TG机器人，裂了~~

# 申请Telegram机器人

首先，添加一个叫[Bot Father](https://t.me/BotFather)的机器人，他的基础信息如下

![BotFather](/wp-content/uploads/2022/01/botFatherInfo.png)

接着，依次在对话框内输入`/newbot`，Bot名字和Bot用户名
>这里重点提醒：名字是显示在外边的名字，用户名就是加好友用的名字
>
>就像我下方的图片，第一条`/newbot`是发起创建机器人的请求
>
>第二条是设置用户名，这里我设置了HanHan's-Bot
>
>第三到六条都是错误的用户名示例（就是目害了）
>
>第七条是设置用户名成功

最后，你就可以看到那一大段的提示机器人创建成功的消息，复制那一串token(红框部分)，那东西类似长这样子：`1234567890:AAAAA-AAAA_AA-AAAAAAAAAAAAAAAAAA_AA`

![创建Bot](/wp-content/uploads/2022/01/createBotLog.png)
接下来，前往你放博客的GitHub页面，转到`Settings`选项卡，再进入`Secrets`页面，单击`New repository secret`，如下方第一张图片的内容，再填入如下方第二张图片的内容，其中`Value`部分填写您的Telegram机器人Token。
![准备填入TG Bot的Token](/wp-content/uploads/2022/01/goToGenSecret.png)
![填入Token](/wp-content/uploads/2022/01/genSecret.png)
接下来，前往你放博客的仓库，创建`.github/workflows/`文件夹，创建`PushTGBot.yml`（好记的文件名）就行，粘贴下面这段代码，其中`branches`（红框部分）应该填写成你每次提交时用的分支，就像下面的一张图片，然后Commit，Push，前往`Action`选项卡，如无意外，推送服务已经开始运行了
```yaml
name: Push TG Channel
on:
  push:
    branches:
      - main
jobs:
  Push:
    runs-on: ubuntu-latest
    if: github.event.repository.owner.id == github.event.sender.id
    env: 
      botToken: ${{ secrets.TG_BOT_TOKEN }}
    steps:
      - name: Get Information & Push to Telegram Channel
        run: |
          commitMsg=`cat /home/runner/work/_temp/_github_workflow/event.json | jq -r '.commits[0].message'`
          echo Commit message: $commitMsg
          curl https://api.telegram.org/bot$botToken/sendMessage -XPOST -d 'chat_id=-1001638488826&text='$commitMsg''
```
![创建Workflow](/wp-content/uploads/2022/01/pasteScript.png)