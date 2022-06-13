---
title: 在运行Windows Server 2012 R2 (带GUI)的服务器上开IIS
tags:
  - 迁移自旧Blog
id: '40'
categories:
  - - 迁移自旧Blog
date: 2020-04-14 10:26:00
---

上次，写了Win10开服务器之后，好像有人真的买了一个服务器来开~~有个屁~~。
考虑到服务器提供商一般不会提供Windows10安装，所以做了一期Server 2012 R2的。

![](https://blog-old.yuameshi.top/passages/20200414/86c926f7d2b527373d23fbee32f7c46af4ce4b37.png@1320w_702h.jpg)

我为了做这期专栏还重置了一边服务器(懒得下镜像)…

> 注意
> **Win Server GUI服务器一般1GB内存妥妥的（不跑特殊任务的话），512MB可能吃紧，爆掉倒不会，就是超出部分都塞到虚拟内存里了，注意别关虚拟内存了。**

啊啊啊，给个三连吧博客你给个寂寞呢？打钱还差不多（逃）

首先，我们得登陆服务器，RDP或者VNC。

* * *

1.打开服务器管理器，这个一般都固定在任务栏

![](https://blog-old.yuameshi.top/passages/20200414/4f2f0a88c6c7804525cf6507384d6e6aaa89c85d.png@792w_404h.jpg)

2.单击"添加角色或功能"

![](https://blog-old.yuameshi.top/passages/20200414/678c71a812820191dd1dd3e06836fa7691fc88d8.png@1320w_702h.jpg)

![](https://blog-old.yuameshi.top/passages/20200414/5507340017df221192b2b0ffcf3d77568a419d3c.png@1320w_468h.jpg)

一直下一步(N)

3.勾选"Web服务器(IIS)"，然后会弹出确认对话框，点击确认

![](https://blog-old.yuameshi.top/passages/20200414/fefb4ac5f8ca924e1de1964a0837c41a84ec5c67.png@1320w_774h.jpg)

记得勾选"包括管理工具"

4.选择"IIS可承载的Web核心"，然后下一步\*2

![](https://blog-old.yuameshi.top/passages/20200414/fcfc2fc30b55bc7924e56553122d7225c71312e0.png@1320w_940h.jpg)

5.根据需求选择需要的功能，然后下一步

![](https://blog-old.yuameshi.top/passages/20200414/d4558455e551a9c31e8e25219309f22b61080f92.png@1320w_938h.jpg)

6.确认无误后，点击安装

其实之后的配置就是和Win10的配置差不多了，把东西塞到C:\\inetpub\\wwwroot下就可以了。
然后访问服务器IP就可以看到你的页面了。

> 注意
> **有些服务器提供商为了安全，某些端口(一般22，3389，80默认开放)需要自己开放，在安全组内开放即可，这里就不做一一解释了**

顺带一提：BiliBili上我也发了：[https://www.bilibili.com/read/cv560489](https://www.bilibili.com/read/cv5604892)