# DSZ考试看板移动端

本程序移植自考试看板 Next，使用 Capacitor 完成移动端构建。

## 开发

本项目要求使用 Node 20，包管理使用 pnpm 完成。

### 安装依赖

```sh
pnpm i
```

### 构建前端

```sh
pnpm build
pnpm sync:android # 同步至Android项目
pnpm sync:ios # 同步至iOS项目
# pnpm sync # 等于上面两条命令
```

### Android

前端构建完成后，使用 Android Studio 打开 `/android` 目录。

### iOS

前端构建完成后，使用 XCode 打开 `/ios/App/App.xcworkspace`。

> 可使用 [这个方法](https://github.com/baimour/Making-Unsigned-iPA-Files/blob/main/README.md) 构建无签名ipa
