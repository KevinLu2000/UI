<!--
  Copyright (C) 2022 MCSManager <mcsmanager-dev@outlook.com>
-->

<template>
  <Dialog v-model="v" :cancel="close">
    <template #title>{{ $t("termSet.title") }}</template>
    <template #default>
      <el-row :gutter="20">
        <el-col :md="12" :offset="0">
          <div>
            <div class="sub-title">
              <p class="sub-title-title">{{ $t("termSet.pty") }}</p>
              <p class="sub-title-info">
                <span v-html="$t('termSet.ptyInfo')"></span>
                <br />
                {{ $t("termSet.ifHaveProblems") }}
              </p>
            </div>
            <div class="row-mt">
              <el-switch v-model="options.pty"></el-switch>
            </div>
          </div>

          <div>
            <div class="row-mt">
              <div class="sub-title">
                <p class="sub-title-title">{{ $t("termSet.ptySize") }}</p>
                <p class="sub-title-info">
                  {{ $t("termSet.ptySizeInfo") }}
                  <br />
                  {{ $t("termSet.ifHaveProblems") }}
                </p>
              </div>
              <div class="row-mt">
                <span>{{ $t("termSet.col") }}</span>
                <el-input v-model="options.ptyWindowCol" :disabled="!options.pty" size="small" style="width: 80px">
                </el-input>
                &nbsp;
                <span>{{ $t("termSet.line") }}</span>
                <el-input :disabled="!options.pty" v-model="options.ptyWindowRow" size="small" style="width: 80px">
                </el-input>
              </div>
            </div>
          </div>

          <div>
            <div class="row-mt">
              <div class="sub-title">
                <p class="sub-title-title">终端字体大小</p>
                <p class="sub-title-info">默认13px，更改后刷新网页生效</p>
              </div>
              <div class="row-mt">
                <el-input v-model="options.fontSize" size="small" style="width: 80px">
                </el-input>
                &nbsp;
                <span>px</span>
              </div>
            </div>
          </div>

          <div>
            <div class="sub-title row-mt">
              <p class="sub-title-title">{{ $t("termSet.WebColor") }}</p>
              <p class="sub-title-info">
                <span v-html="$t('termSet.WebColorInfo')"></span>
              </p>
            </div>
            <div class="row-mt">
              <el-switch v-model="options.haveColor"></el-switch>
            </div>
          </div>
        </el-col>
        <el-col :md="12" :offset="0">
          <div>
            <div class="sub-title row-mt">
              <p class="sub-title-title">{{ $t("instancesDetail.stopCmd") }}</p>
              <p class="sub-title-info">
                {{ $t("termSet.stopCmdInfo") }}
              </p>
            </div>
            <div class="row-mt">
              <el-input v-model="options.stopCommand" size="small"></el-input>
            </div>
          </div>

          <div>
            <div class="sub-title row-mt">
              <p class="sub-title-title">{{ $t("termSet.crlf") }}</p>
              <p class="sub-title-info">
                {{ $t("termSet.crlfInfo") }}
                <br />
                {{ $t("termSet.crlfInfo2") }}
              </p>
            </div>
            <div class="row-mt">
              <el-select v-model="options.crlf" :placeholder="$t('general.pleaseSelect')" size="small"
                style="width: 220px">
                <el-option :label="$t('termSet.newline')" :value="1"></el-option>
                <el-option :label="$t('termSet.EnterNewline')" :value="2"></el-option>
              </el-select>
            </div>
          </div>
          <div class="row-mt">
            <div class="sub-title">
              <p class="sub-title-title">{{ $t("termSet.ioCode") }}</p>
              <p class="sub-title-info">
                {{ $t("termSet.ioCodeInfo") }}
              </p>
            </div>
            <div class="row-mt" style="display: flex">
              <el-select v-model="options.oe" filterable allow-create size="small" default-first-option
                :placeholder="$t('instancesDetail.oe')" style="width: 220px">
                <el-option v-for="item in TERMINAL_CODE" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>

              <el-select v-model="options.ie" filterable size="small" allow-create default-first-option
                :placeholder="$t('instancesDetail.ie')" style="width: 220px; margin-left: 12px">
                <el-option v-for="item in TERMINAL_CODE" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </div>
          </div>
        </el-col>
      </el-row>
      <div class="row-mt">
        <ItemGroup>
          <el-button type="success" size="small" @click="submit">{{
              $t("general.save")
          }}</el-button>
          <el-button size="small" @click="close">{{ $t("general.cancel") }}</el-button>
        </ItemGroup>
      </div>
    </template>
  </Dialog>
</template>

<script>
import Dialog from "@/components/Dialog";
import { request } from "@/app//service/protocol";
import { API_INSTANCE_UPDATE } from "@/app/service/common";
import { TERMINAL_CODE } from "../../service/common";

export default {
  components: { Dialog },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    config: {
      type: Object
    },
    serviceUuid: {
      type: String
    },
    instanceUuid: {
      type: String
    }
  },
  data() {
    return {
      TERMINAL_CODE,
      v: false,
      options: {}
    };
  },
  watch: {
    visible(n) {
      this.v = n;
      this.init();
    }
  },

  methods: {
    init() {
      this.options = this.config;
      this.options.fontSize = localStorage.getItem("terminalFontSize");
      this.options.fontFamily = localStorage.getItem("terminalFontFamily");
    },
    show() {
      this.$emit("update:visible", true);
    },
    close() {
      this.$emit("update:visible", false);
    },
    async submit() {
      try {
        await request({
          method: "PUT",
          url: API_INSTANCE_UPDATE,
          params: { remote_uuid: this.serviceUuid, uuid: this.instanceUuid },
          data: {
            terminalOption: {
              ...this.options
            },
            pingConfig: {},
            eventTask: {},
            crlf: this.options.crlf,
            ie: this.options.ie,
            oe: this.options.oe,
            stopCommand: this.options.stopCommand
          }
        });
        localStorage.setItem("terminalFontSize", this.options.fontSize);
        localStorage.setItem("terminalFontFamily", this.options.fontFamily);
        this.options = {};
        this.close();
        this.$message({
          type: "success",
          message: this.$t("termSet.setUpdate")
        });
      } catch (error) {
        this.$message({
          type: "error",
          message: error.message
        });
      }
    }
  }
};
</script>

<style scoped>
.btn-area {
  margin-top: 8px;
}
</style>
