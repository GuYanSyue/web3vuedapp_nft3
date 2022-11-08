<!-- eslint-disable vue/no-export-in-script-setup -->
<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { ref } from 'vue'

import crypto_, { useCryptoStore } from '../store/crypto'

// 引用crypto.vue的const宣告變數
// import crypto_ from '../store/user'

const defineStore = useCryptoStore()
const { getBalance, viewInfo, mint, connectWallet, withdraw, pause, setmaxMintAmount, setCost, setMaxSupply } = useCryptoStore()
const { account, showBalance, showPaused, showMaxSupply, info, showSupply, showCost } = storeToRefs(defineStore)

const amountInput = ref(null as any)
const newCost_ether = ref(null as any)
const maxMintAmount = ref(null as any)
const maxSupply = ref(null as any)
</script>

<template>
  <div class="flex flex-col items-center">
    <h1 class="text-2xl m-4">
      Get NFT !
    </h1>
    <div v-if="!account">
      <P class="MsoNormal2">
        ～。鍋兒滾 NFT。～
      </P>
      <P class="MsoNormal2">
        點擊下方橙色按鈕連結錢包購買NFT
      </P><br>
      <p>Only for Metamask --Goerli network.</p>
    </div>
    <button v-if="!account" class="bg-amber-600 rounded p-4" @click="connectWallet">
      Connect Wallet
    </button>

    <div v-if="account" class="outsidebox">
      <img src="../assets/Guoergun.jpeg" class="img-mid border shadow p-1">

      <div class="box2">
        <p class="tit1">
          <br>鍋兒滾 NFT<br>
        </p><p> &emsp;</p>
        <p v-if="info === 0" @click="viewInfo()" style="text-decoration: underline;">點我查看NFT資訊</p>
        <div v-if="info === 1">
          <p>剩餘數量: {{ showSupply }}</p>
          <p>價格: {{ showCost }} ether</p>
          <p v-if="showPaused === true">合約狀態: 關閉</p>
          <p v-if="showPaused === false">合約狀態: 開啟</p>
        </div>

        <p class="MsoNormal">
          <br>請輸入購買數量<span class="hide">（最多3個）</span>&emsp;<br>
        </p>
        <p class="show">（最多3個）</p>
        <input
          v-model.number="amountInput"
          type="number"
          :style="{ width: '100%' }"
          name="NFTBookInfo"
          class="py-4 px-4 shadow border rounded"
          maxlength="1"
        >
        <button style="border-radius: 25px;" class="w-1/1 bg-emerald-500 rounded p-4 mt-10 mb-10" @click="mint(amountInput)">
          購買
        </button>
      </div>
    </div>

    <div v-if="account && crypto_.Onlyowner === account" class="outsidebox">
      <p style="font-size: 1.5rem;">
        Hello, owner !
      </p>

      <div class="box">
        <div style="text-align: center;">
          <button class=" bg-yellow-600 rounded p-4 mt-10" @click="getBalance()">
            查看合約餘額
          </button>
          <p v-if="showBalance">合約內餘額: {{ showBalance }} ether</p>
        </div>

        <button class="w-1/1 bg-orange-500 rounded p-4 mt-10" @click="withdraw()">
          提領餘額
        </button><br><p> &emsp;</p>
        <p class="link-top" /><br>
        <p> &emsp;</p><br>

        <input
          v-model.number="maxMintAmount"
          type="number"
          :style="{ width: '8rem' }"
          name="newCost_ether"
          class="py-4 px-4 shadow border rounded"
          maxlength="10"
        >
        <button class="bg-slate-500 rounded p-4" @click="setmaxMintAmount(maxMintAmount)">
          重設一次性鑄造量限制
        </button><p> &emsp;</p><br>

        <input
          v-model.number="newCost_ether"
          :style="{ width: '8rem' }"
          name="newCost_ether"
          class="py-4 px-4 shadow border rounded"
          maxlength="10"
        >
        <button class="bg-slate-500 rounded p-4" @click="setCost(newCost_ether)">
          重設價錢
        </button><br><span>(輸入單位: ether) </span><br><p> &emsp;</p><br>

        <input
          v-model.number="maxSupply"
          type="number"
          :style="{ width: '8rem' }"
          name="newCost_ether"
          class="py-4 px-4 shadow border rounded"
          maxlength="10"
        >
        <button class="bg-slate-500 rounded p-4" @click="setMaxSupply(maxSupply)">
          重設NFT總數量
        </button><br>
        <p>{{ showMaxSupply }}</p><p> &emsp;</p><br>

        <button class="bg-red-500 rounded p-4" @click="pause()">
          關閉販賣
        </button>
        <p v-if="showPaused === true">
          showPaused: {{ showPaused }}
        </p><p> &emsp;</p><br>
      </div>
    </div>
  </div>
</template>

<route lang="yaml">
meta:
  layout: home
</route>
