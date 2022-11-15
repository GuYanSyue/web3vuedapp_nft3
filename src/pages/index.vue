<!-- eslint-disable vue/no-export-in-script-setup -->
<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { ref } from 'vue'

import crypto_, { useCryptoStore } from '../store/crypto'

// 引用crypto.vue的const宣告變數
// import crypto_ from '../store/user'

const defineStore = useCryptoStore()
const { getBalance, viewInfo, mint, connectWallet, withdraw, pause, setBaseURI, setmaxMintAmount, setCost, setMaxSupply } = useCryptoStore()
const { showMaxMintAmount, sum, account, showBalance, showPaused, showURI, info, showSupply, showCost } = storeToRefs(defineStore)

const amountInput = ref(null as any)
const newCost_ether = ref(null as any)
const maxMintAmount = ref(null as any)
const maxSupply = ref(null as any)
const uri = ref(null as any)
</script>

<template>
  <div class="flex flex-col items-center">
    <h1 class="text-2xl m-4" style="font-size: 2.3rem;">
      Get NFT !
    </h1>
    <div v-if="!account">
      <P class="MsoNormal">
        ～～。鍋兒滾 NFT。～～
      </P>
      <P class="MsoNormal">
        點擊下方橙色按鈕連結錢包購買NFT
      </P><br>
      <p>Only for Metamask --Goerli network.</p>
    </div>
    <button v-if="!account" class="bg-amber-600 rounded p-4 b-color" @click="connectWallet">
      Connect Wallet
    </button>

    <div v-if="account" class="outsidebox">
      <img src="../assets/Guoergun.jpeg" class="img-mid border shadow p-1">

      <div class="box2">
        <p class="tit1">
          <br>鍋兒滾 NFT<br>
        </p><p> &emsp;</p>

        <p class="MsoNormal" style="font-size: 1.3rem;">您持有本店NFT數量為:&nbsp;{{ sum }}&nbsp;個</p><p> &emsp;</p>

        <button v-if="info === 0" class=" bg-yellow-600 rounded b-color" @click="viewInfo()">
          點我查看NFT資訊
        </button>
        <div v-if="info === 1" class="MsoNormal">
          <p>剩餘數量: {{ showSupply }}</p>
          <p>價格: {{ showCost }} ether</p>
          <p v-if="showPaused === true">
            合約狀態: 關閉
          </p>
          <p v-if="showPaused === false">合約狀態: 開啟</p><br>
          <button class=" bg-yellow-600 rounded b-color" @click="viewInfo()">
            刷新資訊
          </button>
        </div>
        <p> &emsp;</p>

        <!-- <p @click="walletOfOwner()">
          查看擁有的nft數量
        </p>
        <p>{{ showTokenIds }}</p> -->

        <p class="MsoNormal" style="font-size: 1.3rem;">
          <br>請輸入購買數量（最多{{ showMaxMintAmount }}個）&emsp;<br>
        </p>
        <input
          v-model.number="amountInput"
          placeholder="在此輸入購買數量"
          type="number"
          :style="{ width: '100%' }"
          name="Mint"
          class="py-4 px-4 shadow border rounded"
          maxlength="1"
        >
        <button style="border-radius: 25px; font-size: 1.2rem;" class="w-1/1 bg-emerald-500 rounded p-4 mt-10 mb-10 b-color" @click="mint(amountInput)">
          購買
        </button>
      </div>
    </div>

    <div v-if="account && crypto_.Onlyowner === account" class="outsidebox">
      <p style="font-size: 1.8rem;">
        Hello, owner !
      </p><br>

      <div class="box" style="font-size: 1.2rem;">
        <div class="MsoNormal">
          <p v-if="showBalance">合約內餘額: {{ showBalance }} ether</p>
          <button class=" bg-yellow-600 rounded b-color" @click="getBalance()">
            刷新合約餘額
          </button>
        </div>

        <button class="w-1/1 bg-orange-500 rounded p-4 mt-10 b-color" @click="withdraw()">
          提領餘額
        </button><br><p> &emsp;</p>
        <p class="link-top" /><br>
        <p> &emsp;</p><br>

        <input
          v-model.number="maxMintAmount"
          type="number"
          :style="{ width: '100%' }"
          name="SetmaxMintAmount"
          class="py-4 px-4 shadow border rounded"
          maxlength="10"
        >
        <button class="w-1/1 bg-slate-500 rounded p-4 b-color" @click="setmaxMintAmount(maxMintAmount)">
          重設一次性鑄造量限制
        </button><p> &emsp;</p><br>

        <input
          v-model.number="newCost_ether"
          placeholder="單位: ether"
          :style="{ width: '100%' }"
          name="SetCost"
          class="py-4 px-4 shadow border rounded"
          maxlength="10"
        >
        <button class="w-1/1 bg-slate-500 rounded p-4 b-color" @click="setCost(newCost_ether)">
          重設價錢
        </button><br><span>(輸入單位: ether) </span><br><p> &emsp;</p><br>

        <input
          v-model.number="maxSupply"
          :style="{ width: '100%' }"
          name="SetMaxSupply"
          class="py-4 px-4 shadow border rounded"
          maxlength="10"
        >
        <button class="w-1/1 bg-slate-500 rounded p-4 b-color" @click="setMaxSupply(maxSupply)">
          重設NFT總數量
        </button><br>
        <p> &emsp;</p><br>

        <input
          v-model="uri"
          placeholder="ipfs://"
          :style="{ width: '100%' }"
          name="SetBaseURI"
          class="py-4 px-4 shadow border rounded"
          maxlength="53"
        >
        <button class="w-1/1 bg-slate-500 rounded p-4 b-color" @click="setBaseURI(uri)">
          重設URI
        </button><br>
        <p style="word-break: break-all;">
          {{ showURI }}
        </p><p> &emsp;</p><br>

        <button class="w-1/1 bg-red-500 rounded p-4 b-color" @click="pause()">
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
