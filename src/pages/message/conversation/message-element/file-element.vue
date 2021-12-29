<template>
  <message-bubble :message="message" class="file-message" no-padding>
    <view class="file-element" @click="handleDownloadFile">
      <view class="file-side">
        <image class="file-icon" :src="fileIcon" />
      </view>
      <view class="file-main">
        <view class="file-name">
          {{ fileName }}
        </view>
        <view class="file-size">
          {{ fileSize }}
        </view>
      </view>
    </view>
  </message-bubble>
</template>

<script>
import MessageBubble from "./message-bubble";

const FILE_ICON_MAP = {
  txt: "https://ali-image.dabanjia.com/static/mp/dabanjia/images/file-icon/file-txt.png",
  pdf: "https://ali-image.dabanjia.com/static/mp/dabanjia/images/file-icon/file-pdf.png",
  doc: "https://ali-image.dabanjia.com/static/mp/dabanjia/images/file-icon/file-word.png",
  docx: "https://ali-image.dabanjia.com/static/mp/dabanjia/images/file-icon/file-word.png",
  dot: "https://ali-image.dabanjia.com/static/mp/dabanjia/images/file-icon/file-word.png",
  dotx: "https://ali-image.dabanjia.com/static/mp/dabanjia/images/file-icon/file-word.png",
  wps: "https://ali-image.dabanjia.com/static/mp/dabanjia/images/file-icon/file-word.png",
  ppt: "https://ali-image.dabanjia.com/static/mp/dabanjia/images/file-icon/file-ppt.png",
  pptx: "https://ali-image.dabanjia.com/static/mp/dabanjia/images/file-icon/file-ppt.png",
  xls: "https://ali-image.dabanjia.com/static/mp/dabanjia/images/file-icon/file-excel.png",
  xlsx: "https://ali-image.dabanjia.com/static/mp/dabanjia/images/file-icon/file-excel.png",
  xlt: "https://ali-image.dabanjia.com/static/mp/dabanjia/images/file-icon/file-excel.png",
  xlsm: "https://ali-image.dabanjia.com/static/mp/dabanjia/images/file-icon/file-excel.png",
  zip: "https://ali-image.dabanjia.com/static/mp/dabanjia/images/file-icon/file-zip.png",
  dwg: "https://ali-image.dabanjia.com/static/mp/dabanjia/images/file-icon/file-cad.png",
}
export default {
  name: "FileElement",
  components: {
    MessageBubble,
  },
  props: {
    message: {
      type: Object,
      required: true,
    },
  },
  computed: {
    isMine() {
      return this.message.flow === "out";
    },
    payloadData() {
      return this.message.payloadData;
    },
    fileName() {
      return this.payloadData.fileName;
    },
    fileSize() {
      const size = this.payloadData.fileSize;
      if (size > 1024) {
        if (size / 1024 > 1024) {
          return `${this.toFixed(size / 1024 / 1024)} Mb`;
        }
        return `${this.toFixed(size / 1024)} Kb`;
      }
      return `${this.toFixed(size)}B`;
    },
    fileIcon() {
      let fileType = this.fileName.split('.').pop();
      return FILE_ICON_MAP[fileType] || "https://ali-image.dabanjia.com/static/mp/dabanjia/images/file-icon/file-unknown.png";
    },
  },
  methods: {
    toFixed(number, precision = 2) {
      return number.toFixed(precision);
    },
    handleDownloadFile() {
      uni.showToast({
      	title: '不支持文件下载，请使用打扮家APP下载文件',
      	icon:"none",
      	duration: 2000
      })
    }
  },
};
</script>

<style lang="scss">
.file-element {
  border-radius: 8px;
  display: flex;
  flex-flow: row nowrap;
  width: 496rpx;
  background: #fff;
  box-sizing: border-box;
  padding: 12px;
  overflow: hidden;
}
.file-icon {
  width: 30px;
  height: 36px;
}
.file-side {
  flex: none;
  margin-right: 24rpx;
}
.file-main {
  flex: 1;
  overflow: hidden;
}
.file-name {
  font-size: 14px;
  color: #333;
  line-height: 18px;
  word-break: break-all;
}
.file-size {
  font-size: 10px;
  color: #bbb;
  margin-top: 8rpx;
}
</style>
