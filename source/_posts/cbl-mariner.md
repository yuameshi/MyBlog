---
title: 来自Microsoft的Linux！构建/安装CBL-Mariner
tags:
  - Linux
  - 伪*Server运维
  - 开发
id: '601'
categories:
  - - 伪*Server运维
  - - 开发
  - - 日常
date: 2021-09-05 22:54:00
headerBG: https://i2.wp.com/www.han-han.xyz/wp-content/uploads/2021/08/cbl-headpic.png?fit=1091%2C263&ssl=1
---

# 前言

CBL-Mariner(一下简称**CBL**)，由Microsoft编写的内部Linux发行版，网传基于Fedora。

> 根据官方原话(Google翻译)：
> 
> CBL-Mariner 是 Microsoft 云基础设施和边缘产品和服务的内部 Linux 发行版。CBL-Mariner 旨在为这些设备和服务提供一致的平台，并将增强 Microsoft 跟上 Linux 更新的能力。该计划是微软对各种 Linux 技术不断增加投资的一部分，例如SONiC、Azure Sphere OS和Windows Subsystem for Linux (WSL)。CBL-Mariner 正在公开共享，作为 Microsoft 对开源和回馈 Linux 社区的承诺的一部分。CBL-Mariner 不会改变我们对任何现有第三方 Linux 发行版产品的方法或承诺。  
>   
> CBL-Mariner 的设计理念是，一组小的通用核心包可以满足第一方云和边缘服务的普遍需求，同时允许各个团队在通用核心之上分层附加包，为他们的工作负载生成图像。这是通过一个简单的构建系统实现的，该系统支持：  
>   
> 包生成：这会从 SPEC 文件和源文件中生成所需的一组 RPM 包。  
> 图像生成：这会从给定的一组包中生成所需的图像工件，如 ISO 或 VHD。  
> 无论是部署为容器还是容器主机，CBL-Mariner 都消耗有限的磁盘和内存资源。CBL-Mariner 的轻量级特性还提供更快的启动时间和最小的攻击面。通过将核心映像中的功能集中在我们内部云客户需要的功能上，可以加载更少的服务和更少的攻击媒介。  
>   
> 当出现安全漏洞时，CBL-Mariner 支持基于包的更新模型和基于图像的更新模型。利用通用的RPM 包管理器系统，CBL-Mariner 提供最新的安全补丁和修复程序，以实现快速周转时间的目标。

# 构建CBL-Mariner安装包(ISO)

由于官方并没有提供预先构建用于安装的ISO映像文件，所以我们必须自行对其进行构建。

>警告
>由于中国大陆的网络连通性欠佳，不易构建，建议使用代理或者在[这里](https://ilovecpp-my.sharepoint.com/:u:/g/personal/admin_han-han_xyz/EZlzqTP6hhFMt_sd1wHDv_MBlzj6z1alkWrFVBOtapWdyQ)下载我已经构建完毕的安装映像。(构建日志见[文末](#extra))

这里我们使用Ubuntu(Debian)作为示例，其他发行版亦可以用于构建（WSL除外），只需要安装构建所需的依赖包即可。

## 安装用于构建的依赖包

键入以下命令继续：

```bash
sudo apt install make tar unzip wget curl rpm qemu-utils golang-go genisoimage python2-minimal bison gawk
```

## 构建

首先，从[这里](https://github.com/microsoft/CBL-Mariner/releases)下载最新版本的Source code，zip或tar.gz均可。

然后解压缩，如果您下载的zip格式，则使用`unzip 文件名`，若使用tar.gz格式，则使用`tar xf 文件名`解压。

然后键入`cd CBL*`回车，继续键入`cd toolkit`并回车进入工作目录。

然后键入`make iso REBUILD_TOOLS=y REBUILD_PACKAGES=n CONFIG_FILE=./imageconfigs/full.json`，回车开始构建。

构建完毕后，键入`cd ..`进入上级目录，随后键入`cd out/images/full/`以进入输出文件夹，键入`ls -a`理应看到类似`full-1.0.20210829.2214.iso`的文件名，这就是安装ISO映像，将其提取至你喜欢的未知。

# 安装CBL-Mariner

我们推荐您使用虚拟机进行尝试。

首先，按照一般流程创建虚拟机并启动，在选择按照程序界面选择`Graphical Installer`并回车继续，等待其加载。

![](/wp-content/uploads/2021/08/IIM42KBP9J0VGID4HO4.png)

选择图形安装界面

此时，您应该会看到如下界面

![](/wp-content/uploads/2021/08/VTQJVYQOQC7UJ275Z3R.png)

安装界面

![](/wp-content/uploads/2021/08/TPSUVRPZ89TQER0@D3.png)

正在安装

![](/wp-content/uploads/2021/08/YYYY8J02WTAN6.png)

安装完毕

# 安装完成

此时，重启开机，您便会看到类似如下界面(1-2行)，依次输入账号和密码并回车即可登录。

CBL-Mariner此时并不完善，yum软件源里也没用很多常用的包，但我相信它一定会越做越好。

![](/wp-content/uploads/2021/08/MD5DMJYM4RKKO_H45FT.png)

# 附录

<details>
  <summary>我的构建日志</summary>
```bash
root@hanhan:~# cd cbl/CBL-Mariner-1.0.20210819-1.0/
root@hanhan:~/cbl/CBL-Mariner-1.0.20210819-1.0# ls
build            CODE_OF_CONDUCT.md  LICENSE               out        SECURITY.md  SPECS-SIGNED  toolkit
cgmanifest.json  CONTRIBUTING.md     LICENSES-AND-NOTICES  README.md  SPECS        SUPPORT.md
root@hanhan:~/cbl/CBL-Mariner-1.0.20210819-1.0# ls build/
imagegen            INTERMEDIATE_SRPMS  make_status    rpm_cache       toolchain  worker
INTERMEDIATE_SPECS  logs                pkg_artifacts  SRPM_packaging  tools
root@hanhan:~/cbl/CBL-Mariner-1.0.20210819-1.0# ls build/imagegen/
full  meta-user-data_tmp
root@hanhan:~/cbl/CBL-Mariner-1.0.20210819-1.0# ls build/imagegen/full/
imager_output  workspace
root@hanhan:~/cbl/CBL-Mariner-1.0.20210819-1.0# ls build/imagegen/full/imager_output/
root@hanhan:~/cbl/CBL-Mariner-1.0.20210819-1.0# cd toolkit/
root@hanhan:~/cbl/CBL-Mariner-1.0.20210819-1.0/toolkit# sudo apt install make tar wget curl rpm qemu-utils golang-go genisoimage python2-minimal bison gawk
Reading package lists... Done
Building dependency tree
Reading state information... Done
bison is already the newest version (2:3.5.1+dfsg-1).
gawk is already the newest version (1:5.0.1+dfsg-1).
genisoimage is already the newest version (9:1.1.11-3.1ubuntu1).
golang-go is already the newest version (2:1.13~1ubuntu2).
make is already the newest version (4.2.1-1.2).
wget is already the newest version (1.20.3-1ubuntu1).
python2-minimal is already the newest version (2.7.17-2ubuntu4).
rpm is already the newest version (4.14.2.1+dfsg1-1build2).
curl is already the newest version (7.68.0-1ubuntu2.6).
qemu-utils is already the newest version (1:4.2-3ubuntu6.17).
tar is already the newest version (1.30+dfsg-7ubuntu0.20.04.1).
The following packages were automatically installed and are no longer required:
  libllvm11 libxdamage1
Use 'sudo apt autoremove' to remove them.
0 upgraded, 0 newly installed, 0 to remove and 0 not upgraded.
root@hanhan:~/cbl/CBL-Mariner-1.0.20210819-1.0/toolkit# make iso REBUILD_TOOLS=y REBUILD_PACKAGES=n CONFIG_FILE=./imageconfigs/full.json
fatal: not a git repository (or any of the parent directories): .git
/root/cbl/CBL-Mariner-1.0.20210819-1.0/toolkit/out/tools/imagepkgfetcher \
        --input=./imageconfigs/full.json \
        --base-dir=./imageconfigs/ \
        --log-level=info \
        --log-file=/root/cbl/CBL-Mariner-1.0.20210819-1.0/build/logs/imggen/imagepkgfetcher.log \
        --rpm-dir=/root/cbl/CBL-Mariner-1.0.20210819-1.0/out/RPMS \
        --tmp-dir=/root/cbl/CBL-Mariner-1.0.20210819-1.0/build/imagegen/full/fetcher_tmp \
        --tdnf-worker=/root/cbl/CBL-Mariner-1.0.20210819-1.0/build/worker/worker_chroot.tar.gz \
        --tls-cert= \
        --tls-key= \
        --repo-file="/root/cbl/CBL-Mariner-1.0.20210819-1.0/toolkit/resources/manifests/package/local.repo"  --repo-file="/root/cbl/CBL-Mariner-1.0.20210819-1.0/toolkit/resources/manifests/package/fetcher.repo"  \
         --use-update-repo \
        --input-summary-file= \
        --output-summary-file=/root/cbl/CBL-Mariner-1.0.20210819-1.0/build/imagegen/full/image_deps.json \
        --output-dir=/root/cbl/CBL-Mariner-1.0.20210819-1.0/build/imagegen/full/package_repo
INFO[0000] Enabling update repo
INFO[0000] Creating cloning environment to populate (/root/cbl/CBL-Mariner-1.0.20210819-1.0/build/imagegen/full/package_repo)
INFO[0013] Initializing local RPM repository
INFO[0014] Initializing repository configurations
INFO[0014] Cloning: [hyperv-daemons:C:''V:'',C2:''V2:'' build-essential:C:''V:'',C2:''V2:'' cmake:C:''V:'',C2:''V2:'' createrepo_c:C:''V:'',C2:''V2:'' curl-devel:C:''V:'',C2:''V2:'' device-mapper:C:''V:'',C2:''V2:'' flex:C:''V:'',C2:''V2:'' fuse-devel:C:''V:'',C2:''V2:'' git:C:''V:'',C2:''V2:'' golang:C:''V:'',C2:''V2:'' iputils:C:''V:'',C2:''V2:'' less:C:''V:'',C2:''V2:'' linux-firmware:C:''V:'',C2:''V2:'' net-tools:C:''V:'',C2:''V2:'' ninja-build:C:''V:'',C2:''V2:'' parted:C:''V:'',C2:''V2:'' pciutils:C:''V:'',C2:''V2:'' python3-pip:C:''V:'',C2:''V2:'' tar:C:''V:'',C2:''V2:'' texinfo:C:''V:'',C2:''V2:'' usbutils:C:''V:'',C2:''V2:'' wget:C:''V:'',C2:''V2:'' qemu-kvm:C:''V:'',C2:''V2:'' qemu-img:C:''V:'',C2:''V2:'' shim:C:''V:'',C2:''V2:'' grub2-efi-binary:C:''V:'',C2:''V2:'' ca-certificates:C:''V:'',C2:''V2:'' cronie:C:''V:'',C2:''V2:'' logrotate:C:''V:'',C2:''V2:'' core-packages-base-image:C:''V:'',C2:''V2:'' initramfs:C:''V:'',C2:''V2:'' hyperv-daemons:C:''V:'',C2:''V2:'' shim:C:''V:'',C2:''V2:'' grub2-efi-binary:C:''V:'',C2:''V2:'' ca-certificates:C:''V:'',C2:''V2:'' cronie:C:''V:'',C2:''V2:'' logrotate:C:''V:'',C2:''V2:'' core-packages-base-image:C:''V:'',C2:''V2:'' initramfs:C:''V:'',C2:''V2:'' kernel:C:''V:'',C2:''V2:'' kernel:C:''V:'',C2:''V2:'' grub2-pc:C:''V:'',C2:''V2:'']
INFO[0182] Configuring downloaded RPMs as a local repository
INFO[0187] Saving cloned repository contents to (/root/cbl/CBL-Mariner-1.0.20210819-1.0/build/imagegen/full/image_deps.json)
# Recursive make call to build the initrd image iso_initrd/iso-initrd.img
# Called here instead of as a traditional dependency to make sure package builds are done sequentially for each config.
make image CONFIG_FILE=/root/cbl/CBL-Mariner-1.0.20210819-1.0/toolkit/resources/imageconfigs/iso_initrd.json IMAGE_CACHE_SUMMARY= IMAGE_TAG= && \
/root/cbl/CBL-Mariner-1.0.20210819-1.0/toolkit/out/tools/isomaker \
        --base-dir ./imageconfigs/ \
        --build-dir /root/cbl/CBL-Mariner-1.0.20210819-1.0/build/imagegen/full/workspace \
        --initrd-path /root/cbl/CBL-Mariner-1.0.20210819-1.0/out/images/iso_initrd/iso-initrd.img \
        --input ./imageconfigs/full.json \
        --release-version 1.0.20210829.2214 \
        --resources /root/cbl/CBL-Mariner-1.0.20210819-1.0/toolkit/resources \
        --iso-repo /root/cbl/CBL-Mariner-1.0.20210819-1.0/build/imagegen/full/package_repo \
        --log-level=info \
        --log-file=/root/cbl/CBL-Mariner-1.0.20210819-1.0/build/logs/imggen/isomaker.log \
         \
        --output-dir /root/cbl/CBL-Mariner-1.0.20210819-1.0/out/images/full \
        --image-tag=
make[1]: Entering directory '/root/cbl/CBL-Mariner-1.0.20210819-1.0/toolkit'
fatal: not a git repository (or any of the parent directories): .git
Updated value of CONFIG_FILE (./imageconfigs/full.json -> /root/cbl/CBL-Mariner-1.0.20210819-1.0/toolkit/resources/imageconfigs/iso_initrd.json)
/root/cbl/CBL-Mariner-1.0.20210819-1.0/toolkit/out/tools/imageconfigvalidator \
        --input=/root/cbl/CBL-Mariner-1.0.20210819-1.0/toolkit/resources/imageconfigs/iso_initrd.json \
        --dir=/root/cbl/CBL-Mariner-1.0.20210819-1.0/toolkit/resources/imageconfigs/ && \
touch /root/cbl/CBL-Mariner-1.0.20210819-1.0/build/make_status/validate-image-config-iso_initrd.flag
INFO[0000] Reading configuration file (/root/cbl/CBL-Mariner-1.0.20210819-1.0/toolkit/resources/imageconfigs/iso_initrd.json)
/root/cbl/CBL-Mariner-1.0.20210819-1.0/toolkit/out/tools/imagepkgfetcher \
        --input=/root/cbl/CBL-Mariner-1.0.20210819-1.0/toolkit/resources/imageconfigs/iso_initrd.json \
        --base-dir=/root/cbl/CBL-Mariner-1.0.20210819-1.0/toolkit/resources/imageconfigs/ \
        --log-level=info \
        --log-file=/root/cbl/CBL-Mariner-1.0.20210819-1.0/build/logs/imggen/imagepkgfetcher.log \
        --rpm-dir=/root/cbl/CBL-Mariner-1.0.20210819-1.0/out/RPMS \
        --tmp-dir=/root/cbl/CBL-Mariner-1.0.20210819-1.0/build/imagegen/iso_initrd/fetcher_tmp \
        --tdnf-worker=/root/cbl/CBL-Mariner-1.0.20210819-1.0/build/worker/worker_chroot.tar.gz \
        --tls-cert= \
        --tls-key= \
        --repo-file="/root/cbl/CBL-Mariner-1.0.20210819-1.0/toolkit/resources/manifests/package/local.repo"  --repo-file="/root/cbl/CBL-Mariner-1.0.20210819-1.0/toolkit/resources/manifests/package/fetcher.repo"  \
         --use-update-repo \
        --input-summary-file= \
        --output-summary-file=/root/cbl/CBL-Mariner-1.0.20210819-1.0/build/imagegen/iso_initrd/image_deps.json \
        --output-dir=/root/cbl/CBL-Mariner-1.0.20210819-1.0/build/imagegen/iso_initrd/package_repo
INFO[0000] Enabling update repo
INFO[0000] Creating cloning environment to populate (/root/cbl/CBL-Mariner-1.0.20210819-1.0/build/imagegen/iso_initrd/package_repo)
INFO[0012] Initializing local RPM repository
INFO[0012] Initializing repository configurations
INFO[0012] Cloning: [alsa-lib:C:''V:'',C2:''V2:'' alsa-utils:C:''V:'',C2:''V2:'' espeak-ng:C:''V:'',C2:''V2:'' espeakup:C:''V:'',C2:''V2:'' kernel-drivers-accessibility:C:''V:'',C2:''V2:'' kernel-drivers-sound:C:''V:'',C2:''V2:'' pcaudiolib:C:''V:'',C2:''V2:'' pam:C:''V:'',C2:''V2:'' attr:C:''V:'',C2:''V2:'' awk:C:''V:'',C2:''V2:'' bash:C:''V:'',C2:''V2:'' bzip2:C:''V:'',C2:''V2:'' calamares:C:''V:'',C2:''V2:'' cifs-utils:C:''V:'',C2:''V2:'' coreutils:C:''V:'',C2:''V2:'' cpio:C:''V:'',C2:''V2:'' cracklib:C:''V:'',C2:''V2:'' cracklib-dicts:C:''V:'',C2:''V2:'' cryptsetup:C:''V:'',C2:''V2:'' curl:C:''V:'',C2:''V2:'' dbus:C:''V:'',C2:''V2:'' dosfstools:C:''V:'',C2:''V2:'' dracut:C:''V:'',C2:''V2:'' e2fsprogs:C:''V:'',C2:''V2:'' efibootmgr:C:''V:'',C2:''V2:'' efivar:C:''V:'',C2:''V2:'' expat:C:''V:'',C2:''V2:'' file:C:''V:'',C2:''V2:'' filesystem:C:''V:'',C2:''V2:'' findutils:C:''V:'',C2:''V2:'' glib:C:''V:'',C2:''V2:'' glibc:C:''V:'',C2:''V2:'' gmp:C:''V:'',C2:''V2:'' gptfdisk:C:''V:'',C2:''V2:'' grep:C:''V:'',C2:''V2:'' grub2-efi:C:''V:'',C2:''V2:'' grub2-efi-binary:C:''V:'',C2:''V2:'' grub2-pc:C:''V:'',C2:''V2:'' gzip:C:''V:'',C2:''V2:'' haveged:C:''V:'',C2:''V2:'' iputils:C:''V:'',C2:''V2:'' less:C:''V:'',C2:''V2:'' libcap:C:''V:'',C2:''V2:'' libgcc:C:''V:'',C2:''V2:'' libstdc++:C:''V:'',C2:''V2:'' lvm2:C:''V:'',C2:''V2:'' lua:C:''V:'',C2:''V2:'' lz4:C:''V:'',C2:''V2:'' ncurses:C:''V:'',C2:''V2:'' ncurses-term:C:''V:'',C2:''V2:'' net-tools:C:''V:'',C2:''V2:'' nspr:C:''V:'',C2:''V2:'' nss:C:''V:'',C2:''V2:'' openssl:C:''V:'',C2:''V2:'' mariner-release:C:''V:'',C2:''V2:'' parted:C:''V:'',C2:''V2:'' pciutils:C:''V:'',C2:''V2:'' pcre:C:''V:'',C2:''V2:'' pkg-config:C:''V:'',C2:''V2:'' popt:C:''V:'',C2:''V2:'' readline:C:''V:'',C2:''V2:'' rpm:C:''V:'',C2:''V2:'' sed:C:''V:'',C2:''V2:'' shadow-utils:C:''V:'',C2:''V2:'' shim:C:''V:'',C2:''V2:'' sqlite:C:''V:'',C2:''V2:'' systemd:C:''V:'',C2:''V2:'' tar:C:''V:'',C2:''V2:'' tdnf:C:''V:'',C2:''V2:'' usbutils:C:''V:'',C2:''V2:'' util-linux:C:''V:'',C2:''V2:'' veritysetup:C:''V:'',C2:''V2:'' vim:C:''V:'',C2:''V2:'' words:C:''V:'',C2:''V2:'' xz:C:''V:'',C2:''V2:'' zlib:C:''V:'',C2:''V2:'' kernel:C:''V:'',C2:''V2:'' grub2-pc:C:''V:'',C2:''V2:'']
INFO[0177] Configuring downloaded RPMs as a local repository
INFO[0179] Saving cloned repository contents to (/root/cbl/CBL-Mariner-1.0.20210819-1.0/build/imagegen/iso_initrd/image_deps.json)
mkdir -p /root/cbl/CBL-Mariner-1.0.20210819-1.0/build/imagegen/iso_initrd/imager_output && \
rm -rf /root/cbl/CBL-Mariner-1.0.20210819-1.0/build/imagegen/iso_initrd/imager_output/* && \
/root/cbl/CBL-Mariner-1.0.20210819-1.0/toolkit/out/tools/imager \
        --build-dir /root/cbl/CBL-Mariner-1.0.20210819-1.0/build/imagegen/iso_initrd/workspace \
        --input /root/cbl/CBL-Mariner-1.0.20210819-1.0/toolkit/resources/imageconfigs/iso_initrd.json \
        --base-dir=/root/cbl/CBL-Mariner-1.0.20210819-1.0/toolkit/resources/imageconfigs/ \
        --log-level=info \
        --log-file=/root/cbl/CBL-Mariner-1.0.20210819-1.0/build/logs/imggen/imager.log \
        --local-repo /root/cbl/CBL-Mariner-1.0.20210819-1.0/build/imagegen/iso_initrd/package_repo \
        --tdnf-worker /root/cbl/CBL-Mariner-1.0.20210819-1.0/build/worker/worker_chroot.tar.gz \
        --repo-file=/root/cbl/CBL-Mariner-1.0.20210819-1.0/toolkit/resources/manifests/image/local.repo \
        --assets /root/cbl/CBL-Mariner-1.0.20210819-1.0/toolkit/resources/assets/ \
        --output-dir /root/cbl/CBL-Mariner-1.0.20210819-1.0/build/imagegen/iso_initrd/imager_output && \
touch /root/cbl/CBL-Mariner-1.0.20210819-1.0/build/make_status/imager_disk_output.flag
INFO[0000] Building system configuration (ISO initrd)
INFO[0000] Creating rootfs
INFO[0000] Rootfs is including a kernel (kernel)
INFO[0011] HidepidDisabled is false.
WARN[0013] using empty dict to provide pw_dict
WARN[0016] warning: /installroot/mariner-release-1.0-21.cm1.noarch.rpm: Header V4 RSA/SHA256 Signature, key ID 3135ce90: NOKEY
WARN[0033] alsactl: init:1759: No soundcards found...
WARN[0033] alsactl: save_state:1595: No soundcards found...
WARN[0037] using empty dict to provide pw_dict
WARN[0038] Package kernel-drivers-accessibility is already installed.
WARN[0038] Nothing to do.
WARN[0038] Package kernel-drivers-sound is already installed.
WARN[0038] Nothing to do.
WARN[0039] Package pcaudiolib is already installed.
WARN[0039] Nothing to do.
WARN[0039] Package pam is already installed.
WARN[0039] Nothing to do.
WARN[0039] Package bash is already installed.
WARN[0039] Nothing to do.
WARN[0049] switching pw_dict to cracklib-dicts
WARN[0049] Package coreutils is already installed.
WARN[0049] Nothing to do.
WARN[0050] Package cracklib is already installed.
WARN[0050] Nothing to do.
WARN[0050] Package cracklib-dicts is already installed.
WARN[0050] Nothing to do.
WARN[0051] Package dbus is already installed.
WARN[0051] Nothing to do.
WARN[0051] Package e2fsprogs is already installed.
WARN[0052] Nothing to do.
WARN[0052] Package efibootmgr is already installed.
WARN[0052] Nothing to do.
WARN[0052] Package efivar is already installed.
WARN[0052] Nothing to do.
WARN[0052] Package expat is already installed.
WARN[0052] Nothing to do.
WARN[0052] Package filesystem is already installed.
WARN[0052] Nothing to do.
WARN[0052] Package findutils is already installed.
WARN[0052] Nothing to do.
WARN[0052] Package glib is already installed.
WARN[0052] Nothing to do.
WARN[0052] Package glibc is already installed.
WARN[0052] Nothing to do.
WARN[0053] Package gmp is already installed.
WARN[0053] Nothing to do.
WARN[0053] Package grep is already installed.
WARN[0053] Nothing to do.
WARN[0056] Package libcap is already installed.
WARN[0056] Nothing to do.
WARN[0056] Package libgcc is already installed.
WARN[0056] Nothing to do.
WARN[0056] Package libstdc++ is already installed.
WARN[0056] Nothing to do.
WARN[0056] Running in chroot, ignoring request: start
WARN[0057] Package lz4 is already installed.
WARN[0057] Nothing to do.
WARN[0057] Package ncurses is already installed.
WARN[0057] Nothing to do.
WARN[0058] Package openssl is already installed.
WARN[0058] Nothing to do.
WARN[0058] Package mariner-release is already installed.
WARN[0058] Nothing to do.
WARN[0058] Package parted is already installed.
WARN[0058] Nothing to do.
WARN[0058] Package pcre is already installed.
WARN[0059] Nothing to do.
WARN[0059] Package pkg-config is already installed.
WARN[0059] Nothing to do.
WARN[0059] Package popt is already installed.
WARN[0059] Nothing to do.
WARN[0059] Package readline is already installed.
WARN[0059] Nothing to do.
WARN[0059] Package sed is already installed.
WARN[0059] Nothing to do.
WARN[0061] Package systemd is already installed.
WARN[0061] Nothing to do.
WARN[0062] Package util-linux is already installed.
WARN[0062] Nothing to do.
WARN[0063] Package xz is already installed.
WARN[0063] Nothing to do.
WARN[0063] Package zlib is already installed.
WARN[0063] Nothing to do.
INFO[0063] Adding user (root)
WARN[0063] Failed to stop gpg-agent. This is expected if it is not installed: exec: "gpgconf": executable file not found in $PATH
INFO[0063] Proceeding to cleanup extra files in chroot /root/cbl/CBL-Mariner-1.0.20210819-1.0/build/imagegen/iso_initrd/workspace/setuproot.
INFO[0063] Cleaning up directory /tmp/additionalfiles
INFO[0064] Cleaning up directory /tmp/postinstall
INFO[0064] Cleaning up directory /tmp/sshpubkeys
Finished updating /root/cbl/CBL-Mariner-1.0.20210819-1.0/build/imagegen/iso_initrd/imager_output
cd /root/cbl/CBL-Mariner-1.0.20210819-1.0/toolkit/tools/roast && \
        go test -covermode=atomic -coverprofile=/root/cbl/CBL-Mariner-1.0.20210819-1.0/build/tools/roast.test_coverage ./... && \
        go build -o /root/cbl/CBL-Mariner-1.0.20210819-1.0/toolkit/out/tools
?       microsoft.com/pkggen/roast      [no test files]
?       microsoft.com/pkggen/roast/formats      [no test files]
VMXTEMPLATE=/root/cbl/CBL-Mariner-1.0.20210819-1.0/toolkit/resources/assets//ova/vmx-template OVFINFO=/root/cbl/CBL-Mariner-1.0.20210819-1.0/toolkit/resources/assets//ova/ovfinfo.txt \
/root/cbl/CBL-Mariner-1.0.20210819-1.0/toolkit/out/tools/roast \
        --dir=/root/cbl/CBL-Mariner-1.0.20210819-1.0/build/imagegen/iso_initrd/imager_output \
        --config /root/cbl/CBL-Mariner-1.0.20210819-1.0/toolkit/resources/imageconfigs/iso_initrd.json \
        --output-dir /root/cbl/CBL-Mariner-1.0.20210819-1.0/out/images/iso_initrd \
        --tmp-dir /root/cbl/CBL-Mariner-1.0.20210819-1.0/build/imagegen/iso_initrd/roaster_tmp \
        --release-version 1.0.20210829.2219 \
        --log-level=info \
        --log-file=/root/cbl/CBL-Mariner-1.0.20210819-1.0/build/logs/imggen/roast.log \
        --image-tag=
INFO[0000] Converting (1) artifacts
WARN[0030] tar: Removing leading `/' from member names
WARN[0042] Skipping move. Source and destination are the same file (/root/cbl/CBL-Mariner-1.0.20210819-1.0/out/images/iso_initrd/iso-initrd.img.tar.gz).
INFO[0042] [1/1] Converted (/root/cbl/CBL-Mariner-1.0.20210819-1.0/build/imagegen/iso_initrd/imager_output/rootfs) -> (/root/cbl/CBL-Mariner-1.0.20210819-1.0/out/images/iso_initrd/iso-initrd.img.tar.gz)
make[1]: Leaving directory '/root/cbl/CBL-Mariner-1.0.20210819-1.0/toolkit'
INFO[0000] Building ISO under '/root/cbl/CBL-Mariner-1.0.20210819-1.0/build/imagegen/full/workspace'.
WARN[0000] Unexpected: temporary ISO build path '/root/cbl/CBL-Mariner-1.0.20210819-1.0/build/imagegen/full/workspace' exists. Removing.
INFO[0005] Preparing ISO's bootloaders.
WARN[0005] 3+0 records in
WARN[0005] 3+0 records out
WARN[0005] 3145728 bytes (3.1 MB, 3.0 MiB) copied, 0.00951747 s, 331 MB/s
INFO[0007] Generating ISO image under '/root/cbl/CBL-Mariner-1.0.20210819-1.0/out/images/full/full-1.0.20210829.2214.iso'.
WARN[0007] I: -input-charset not specified, using utf-8 (detected in locale settings)
WARN[0007] Size of boot image is 4 sectors -> No emulation
WARN[0007] Size of boot image is 6144 sectors -> No emulation
WARN[0007]   1.44% done, estimate finish Sun Aug 29 22:19:56 2021
WARN[0007]   2.88% done, estimate finish Sun Aug 29 22:19:56 2021
WARN[0007]   4.32% done, estimate finish Sun Aug 29 22:19:56 2021
WARN[0007]   5.76% done, estimate finish Sun Aug 29 22:19:56 2021
WARN[0007]   7.20% done, estimate finish Sun Aug 29 22:19:56 2021
WARN[0007]   8.64% done, estimate finish Sun Aug 29 22:19:56 2021
WARN[0007]  10.07% done, estimate finish Sun Aug 29 22:19:56 2021
WARN[0007]  11.51% done, estimate finish Sun Aug 29 22:19:56 2021
WARN[0008]  12.95% done, estimate finish Sun Aug 29 22:19:56 2021
WARN[0008]  14.39% done, estimate finish Sun Aug 29 22:20:02 2021
WARN[0008]  15.83% done, estimate finish Sun Aug 29 22:20:02 2021
WARN[0008]  17.27% done, estimate finish Sun Aug 29 22:20:01 2021
WARN[0008]  18.70% done, estimate finish Sun Aug 29 22:20:01 2021
WARN[0008]  20.14% done, estimate finish Sun Aug 29 22:20:00 2021
WARN[0008]  21.58% done, estimate finish Sun Aug 29 22:20:00 2021
WARN[0008]  23.02% done, estimate finish Sun Aug 29 22:20:00 2021
WARN[0009]  24.46% done, estimate finish Sun Aug 29 22:20:00 2021
WARN[0009]  25.90% done, estimate finish Sun Aug 29 22:20:03 2021
WARN[0009]  27.33% done, estimate finish Sun Aug 29 22:20:03 2021
WARN[0009]  28.78% done, estimate finish Sun Aug 29 22:20:02 2021
WARN[0009]  30.21% done, estimate finish Sun Aug 29 22:20:02 2021
WARN[0009]  31.65% done, estimate finish Sun Aug 29 22:20:02 2021
WARN[0009]  33.09% done, estimate finish Sun Aug 29 22:20:02 2021
WARN[0009]  34.53% done, estimate finish Sun Aug 29 22:20:01 2021
WARN[0009]  35.97% done, estimate finish Sun Aug 29 22:20:01 2021
WARN[0009]  37.41% done, estimate finish Sun Aug 29 22:20:01 2021
WARN[0010]  38.84% done, estimate finish Sun Aug 29 22:20:01 2021
WARN[0010]  40.28% done, estimate finish Sun Aug 29 22:20:00 2021
WARN[0010]  41.72% done, estimate finish Sun Aug 29 22:20:03 2021
WARN[0010]  43.16% done, estimate finish Sun Aug 29 22:20:02 2021
WARN[0010]  44.60% done, estimate finish Sun Aug 29 22:20:02 2021
WARN[0010]  46.04% done, estimate finish Sun Aug 29 22:20:02 2021
WARN[0010]  47.47% done, estimate finish Sun Aug 29 22:20:02 2021
WARN[0010]  48.92% done, estimate finish Sun Aug 29 22:20:02 2021
WARN[0010]  50.35% done, estimate finish Sun Aug 29 22:20:01 2021
WARN[0010]  51.79% done, estimate finish Sun Aug 29 22:20:01 2021
WARN[0010]  53.23% done, estimate finish Sun Aug 29 22:20:01 2021
WARN[0010]  54.67% done, estimate finish Sun Aug 29 22:20:01 2021
WARN[0010]  56.11% done, estimate finish Sun Aug 29 22:20:01 2021
WARN[0011]  57.55% done, estimate finish Sun Aug 29 22:20:01 2021
WARN[0011]  58.98% done, estimate finish Sun Aug 29 22:20:02 2021
WARN[0011]  60.42% done, estimate finish Sun Aug 29 22:20:02 2021
WARN[0011]  61.86% done, estimate finish Sun Aug 29 22:20:02 2021
WARN[0011]  63.30% done, estimate finish Sun Aug 29 22:20:02 2021
WARN[0011]  64.74% done, estimate finish Sun Aug 29 22:20:02 2021
WARN[0011]  66.18% done, estimate finish Sun Aug 29 22:20:02 2021
WARN[0011]  67.62% done, estimate finish Sun Aug 29 22:20:01 2021
WARN[0011]  69.05% done, estimate finish Sun Aug 29 22:20:01 2021
WARN[0011]  70.50% done, estimate finish Sun Aug 29 22:20:01 2021
WARN[0012]  71.93% done, estimate finish Sun Aug 29 22:20:01 2021
WARN[0012]  73.37% done, estimate finish Sun Aug 29 22:20:02 2021
WARN[0012]  74.81% done, estimate finish Sun Aug 29 22:20:02 2021
WARN[0012]  76.25% done, estimate finish Sun Aug 29 22:20:02 2021
WARN[0012]  77.69% done, estimate finish Sun Aug 29 22:20:02 2021
WARN[0012]  79.13% done, estimate finish Sun Aug 29 22:20:02 2021
WARN[0012]  80.56% done, estimate finish Sun Aug 29 22:20:02 2021
WARN[0012]  82.00% done, estimate finish Sun Aug 29 22:20:02 2021
WARN[0012]  83.44% done, estimate finish Sun Aug 29 22:20:01 2021
WARN[0012]  84.88% done, estimate finish Sun Aug 29 22:20:01 2021
WARN[0012]  86.32% done, estimate finish Sun Aug 29 22:20:01 2021
WARN[0012]  87.76% done, estimate finish Sun Aug 29 22:20:01 2021
WARN[0013]  89.20% done, estimate finish Sun Aug 29 22:20:01 2021
WARN[0013]  90.64% done, estimate finish Sun Aug 29 22:20:02 2021
WARN[0013]  92.07% done, estimate finish Sun Aug 29 22:20:02 2021
WARN[0013]  93.51% done, estimate finish Sun Aug 29 22:20:02 2021
WARN[0013]  94.95% done, estimate finish Sun Aug 29 22:20:02 2021
WARN[0013]  96.39% done, estimate finish Sun Aug 29 22:20:02 2021
WARN[0014]  97.83% done, estimate finish Sun Aug 29 22:20:02 2021
WARN[0014]  99.27% done, estimate finish Sun Aug 29 22:20:03 2021
WARN[0014] Total translation table size: 2048
WARN[0014] Total rockridge attributes bytes: 29996
WARN[0014] Total directory bytes: 72498
WARN[0014] Path table size(bytes): 222
WARN[0014] Max brk space used 44000
WARN[0014] 347556 extents written (678 MB)
root@hanhan:~/cbl/CBL-Mariner-1.0.20210819-1.0/toolkit# ls
```

</details>