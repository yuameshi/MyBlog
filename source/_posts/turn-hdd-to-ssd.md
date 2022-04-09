---
title: 让你的机械变成固态！
tags:
  - 迁移自旧Blog
id: '45'
categories:
  - - 迁移自旧Blog
date: 2020-04-17 13:08:00
---

今天天气真不错，找到一个好东西。

叫PrimoCache，话不多说，直接上图:

[![](https://cdn.jsdelivr.net/gh/Yuameshi/blog-old@master/passages/20200417/aida64.jpg)](https://blog-old.han-han.xyz/passages/20200417/aida64.jpg)

AIDA64磁盘信息

![](https://cdn.jsdelivr.net/gh/Yuameshi/blog-old@master/passages/20200417/10151.jpg)

CDM测试结果1

[![](https://cdn.jsdelivr.net/gh/Yuameshi/blog-old@master/passages/20200417/10622.jpg)](https://cdn.jsdelivr.net/gh/Yuameshi/blog-old@master/passages/20200417/CDM_20200415163824.txt)

CDM测试结果2（点击查看源TXT）

[![](https://cdn.jsdelivr.net/gh/Yuameshi/blog-old@master/passages/20200417/10933.jpg)](https://cdn.jsdelivr.net/gh/Yuameshi/blog-old@master/passages/20200417/CDM_20200415153952.txt)

CDM测试结果3（点击查看源TXT）

这是一块SATA总线的M.2固态盘，持续写入直接给拉到了四块NVMe组RAID-0的速度（只要你不是传输什么特大文件的话) 。原理是在内存划一个分区拿来做硬盘的DRAM，所以电脑经常异常断电的可以洗洗睡了。

由于手头上没有能读取1000M/s以上的所以就没有测试实际效果了。什么东西？