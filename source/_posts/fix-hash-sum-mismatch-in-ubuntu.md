---
title: Ubuntu出现Hash Sum mismatch错误的解决方案
tags:
  - Linux
  - Linux子系统
  - Ubuntu
  - Windows Subsystem Linux
  - WSL
  - 日常
id: '522'
categories:
  - - 伪*Server运维
  - - 日常
date: 2021-07-07 21:59:52
headerBG: https://i1.wp.com/www.yuameshi.top/wp-content/uploads/2021/07/%E5%B1%8F%E5%B9%95%E6%88%AA%E5%9B%BE-2021-07-07-215720.png?fit=720%2C205&ssl=1
---

最近在WTG的WSL(1)上执行`sudo apt update`报错：`E: Failed to fetch store:/var/lib/apt/lists/partial/mirrors.aliyun.com_ubuntu_dists_focal-proposed_restricted_cnf_Commands-amd64 Hash Sum mismatch`

![](/wp-content/uploads/2021/07/image.png)

上网翻了翻是因为文件意外被修改导致MD5值不一致，网上有说是Great Firewall of Celestial Dynasty(translated by google)的问题，但我怎么看怎么觉得是我WTG意外断电次数过多/意外拔掉U盘/BUG\_CODE\_USB\_3.0各种奇奇怪怪的东西整出来的问题（之前更新的好好的）。

话不多说，下面是解决方案：

```bash
# 删除源缓存
sudo rm -fR /var/lib/apt/lists/*
# 新建下载缓存文件夹
sudo mkdir /var/lib/apt/lists/partial
# 重新更新源
sudo apt-get update 
```