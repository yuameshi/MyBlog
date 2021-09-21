---
title: “今天干了件大好事”（这是甚么破玩意儿？）
tags:
  - 迁移自旧Blog
id: '47'
categories:
  - - 迁移自旧Blog
date: 2020-04-20 10:00:00
---

\*\*图是后面补的

嗨呀！！！

今天疯狂损耗阿里云的云硬盘。

往里边创建了18TB的“大文件”。

![](https://cdn.jsdelivr.net/gh/HanHan233/blog-old@master/passages/20200420/init.jpg)

1.5太字节\*12个同时创建

![](https://cdn.jsdelivr.net/gh/HanHan233/blog-old@master/passages/20200420/OHHHHH~1.jpg)

完成图

我开了磁盘压缩，所以实际上是有写入数据，但是占用空间48KB。  
     真的，建议改成：硬 盘 测 试  
     不过谈到速度，这个就有点蛋疼。  
     这里是写入6小时后的占用数据总览

![](https://cdn.jsdelivr.net/gh/HanHan233/blog-old@master/passages/20200420/@ANNZ%7DC1LM%7B]1V)[AGI@WI2.jpg)

CPU使用率

![](https://cdn.jsdelivr.net/gh/HanHan233/blog-old@master/passages/20200420/K56%600@Q%7BM~UC_OAF(G4VIH0~1.jpg)

系统盘读/写状况

![](https://cdn.jsdelivr.net/gh/HanHan233/blog-old@master/passages/20200420/HBE%7B2(D3%7BEQXRX%7B]SBB%7D@6N.jpg)

系统盘IOPS

各种数据(3天内)      可以看到，写入速度大概是3041Kbps上下，换算成Mbps也就2.96Mbps 而众所周知，Mbps换算M/s要除以8(就像我的服务器带宽1Mbps，最大下载速度也就140K/s上下)

![](https://cdn.jsdelivr.net/gh/HanHan233/blog-old@master/passages/20200420/I]I_5M3O4M%7BRL%7DZ$HW%60]_GT.jpg)

换算结果

![](https://cdn.jsdelivr.net/gh/HanHan233/blog-old@master/passages/20200420/37.jpg)

计算结果

最终呢，就是0.37M/s，这TM是USB2.0的WTG吗是个龟龟.

> 警告  
> **随便猜的！别当真**

> PS
> 
> 最近我想了想还是取消了禁止F12，打开控制台(侧边)、保存页面、右键和字符选择，毕竟几乎封死了所有一般人复制的手段还挂CC协议真的是在耍流氓。