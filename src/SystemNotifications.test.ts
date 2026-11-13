import { describe, expect, it } from "vitest";
import { notificationContent } from "./SystemNotifications";
import type { Work } from "./schema";

const apps = [
  { id: "wechat", name: "微信", installed: true },
] as Work["apps"];

describe("system notification routing metadata", () => {
  it("parses a WeChat notification with its exact conversation id", () => {
    const payload = JSON.stringify({
      kind: "app-notification",
      appId: "wechat",
      appName: "微信",
      contactName: "张极",
      body: "测试通知",
      threadId: "wechat-zhangji",
      threadTitle: "张极",
    });
    expect(notificationContent(payload, apps)).toMatchObject({
      appId: "wechat",
      appName: "微信",
      title: "张极",
      body: "测试通知",
      threadId: "wechat-zhangji",
      threadTitle: "张极",
    });
  });

  it("keeps legacy plain-text notifications readable", () => {
    expect(notificationContent("微信:旧消息", apps)).toMatchObject({
      appId: "wechat",
      appName: "微信",
      title: "微信",
      body: "旧消息",
    });
  });
});
