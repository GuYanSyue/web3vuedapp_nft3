/* eslint-disable no-alert */
/* eslint-disable no-console */
import { ethers } from 'ethers'
import { acceptHMRUpdate, defineStore } from 'pinia'

// import { ref } from 'vue'
import contractABI from '../artifacts/contracts/ShopNFT.sol/ShopNFT.json'
const contractAddress = '0x22579eE9F78ef9Ed8cAe46f068370c106b4192b9'
const Onlyowner = '0xc98e9c69119eb0b764b0d5dcbc1532de8bfc2d4f'

// const Sig: number | ethers.utils.BytesLike | ethers.utils.Hexable = []
const Sig = ref('0x')
// 預設匯出 !重要
export default {
  Sig, Onlyowner,
}

export const useCryptoStore = defineStore('user', () => {
  const account = ref(null)
  const loading = ref(false)
  const Amount = ref(0)
  const showURI = ref(null)
  const showCost = ref(null)
  const showMaxMintAmount = ref(null)
  const showMaxSupply = ref(null)
  const showPaused = ref(null)
  const showTokenIds = ref([] as any)
  const showTokenURI = ref(null)
  const showSupply = ref(null)
  const info = ref(0)
  const showBalance = ref(null)
  const Account = ref('123')
  const sum = ref(0)

  async function getBalance() {
    setLoader(true)
    try {
      const { ethereum } = window
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum)
        const signer = provider.getSigner()
        const SimplePayContract = new ethers.Contract(contractAddress, contractABI.abi, signer)

        const count = (await SimplePayContract.getBalance())
        const amt = ethers.utils.formatEther(count)
        showBalance.value = amt
        console.log('count', amt)
        setLoader(false)
      }
    }
    catch (e) {
      setLoader(false)
      console.log('e', e)
    }
  }
  async function viewInfo() {
    setLoader(true)
    try {
      const { ethereum } = window
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum)
        const signer = provider.getSigner()
        const ShopPortalContract = new ethers.Contract(contractAddress, contractABI.abi, signer)

        const Supply = (await ShopPortalContract.supply())
        showSupply.value = Supply
        showPaused.value = (await ShopPortalContract.paused())
        showCost.value = (await ShopPortalContract.cost()) / 1e18
        info.value = 1

        console.log('Supply', Supply)
        setLoader(false)
      }
    }
    catch (e) {
      setLoader(false)
      console.log('e', e)
    }
  }

  // ------------------------------------------------------
  async function mint(amountInput: any) {
    console.log('setting loader')
    setLoader(true)
    try {
      console.log('got', amountInput)
      const { ethereum } = window
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum)
        const signer = provider.getSigner() // 持有使用者的私鑰並以此簽核 (Signer)
        const ShopPortalContract = new ethers.Contract(contractAddress, contractABI.abi, signer)

        const send_token_amount = amountInput * 1 / 1e6 // 數量 * 0.000001

        const overrides = {
          value: ethers.utils.parseUnits(send_token_amount.toString(), 18),
          gasLimit: 3000000,
        }

        // 呼叫合約函數
        const mintTxn = await ShopPortalContract.mint(amountInput, overrides)
        const Supply = (await ShopPortalContract.supply())
        showSupply.value = Supply

        console.log('Mining....', mintTxn.hash)
        await mintTxn.wait()
        console.log('Mined -- ', mintTxn.hash)
      }
      else {
        console.log('Ethereum object doesn\'t exist!')
      }
    }
    catch (error) {
      setLoader(false)
      console.log(error)
    }
  }

  async function withdraw() {
    console.log('setting loader')
    setLoader(true)
    try {
      const { ethereum } = window
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum)
        const signer = provider.getSigner() // 持有使用者的私鑰並以此簽核 (Signer)
        const ShopPortalContract = new ethers.Contract(contractAddress, contractABI.abi, signer)

        // 呼叫合約函數
        const mintTxn = await ShopPortalContract.withdraw(Onlyowner)

        console.log('Running....', mintTxn.hash)
        await mintTxn.wait()
        console.log('Withdraw -- ', mintTxn.hash)
      }
      else {
        console.log('Ethereum object doesn\'t exist!')
      }
    }
    catch (error) {
      setLoader(false)
      console.log(error)
    }
  }

  async function walletOfOwner(A: any) {
    console.log('setting loader')
    setLoader(true)
    try {
      const { ethereum } = window
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum)
        const signer = provider.getSigner() // 持有使用者的私鑰並以此簽核 (Signer)
        const ShopPortalContract = new ethers.Contract(contractAddress, contractABI.abi, signer)

        // const newAccount = utils.getAddress(Account.value)

        // 呼叫合約函數
        const mintTxn = await ShopPortalContract.walletOfOwner(A)
        showTokenIds.value = mintTxn.toString()

        sum.value = mintTxn.length
        showMaxMintAmount.value = await ShopPortalContract.maxMintAmount()

        console.log('Setting....', mintTxn.hash)
        await mintTxn.wait()
        console.log('Set -- ', mintTxn.hash)
      }
      else {
        console.log('Ethereum object doesn\'t exist!')
      }
    }
    catch (error) {
      setLoader(false)
      console.log(error)
    }
  }

  async function tokenURI(tokenId: any) {
    console.log('setting loader')
    setLoader(true)
    try {
      const { ethereum } = window
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum)
        const signer = provider.getSigner() // 持有使用者的私鑰並以此簽核 (Signer)
        const ShopPortalContract = new ethers.Contract(contractAddress, contractABI.abi, signer)

        // 呼叫合約函數
        const mintTxn = await ShopPortalContract.tokenURI(tokenId)
        showTokenURI.value = mintTxn

        console.log('Setting....', mintTxn.hash)
        await mintTxn.wait()
        console.log('Set -- ', mintTxn.hash)
      }
      else {
        console.log('Ethereum object doesn\'t exist!')
      }
    }
    catch (error) {
      setLoader(false)
      console.log(error)
    }
  }

  async function pause() {
    console.log('setting loader')
    setLoader(true)
    try {
      const { ethereum } = window
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum)
        const signer = provider.getSigner() // 持有使用者的私鑰並以此簽核 (Signer)
        const ShopPortalContract = new ethers.Contract(contractAddress, contractABI.abi, signer)

        // 呼叫合約函數
        const mintTxn = await ShopPortalContract.pause()
        showPaused.value = (await ShopPortalContract.paused())

        console.log('Setting....', mintTxn.hash)
        await mintTxn.wait()
        console.log('Set -- ', mintTxn.hash)
      }
      else {
        console.log('Ethereum object doesn\'t exist!')
      }
    }
    catch (error) {
      setLoader(false)
      console.log(error)
    }
  }

  // ------------------------------------------------------

  async function setBaseURI(newURI: any) {
    console.log('setting loader')
    setLoader(true)
    try {
      const { ethereum } = window
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum)
        const signer = provider.getSigner() // 持有使用者的私鑰並以此簽核 (Signer)
        const ShopPortalContract = new ethers.Contract(contractAddress, contractABI.abi, signer)

        // 呼叫合約函數
        const mintTxn = await ShopPortalContract.setBaseURI(newURI)
        showURI.value = (await ShopPortalContract.baseURI())

        console.log('Setting....', mintTxn.hash)
        await mintTxn.wait()
        console.log('Set -- ', mintTxn.hash)
      }
      else {
        console.log('Ethereum object doesn\'t exist!')
      }
    }
    catch (error) {
      setLoader(false)
      console.log(error)
    }
  }

  async function setCost(newCost_ether: any) {
    console.log('setting loader')
    setLoader(true)
    try {
      const { ethereum } = window
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum)
        const signer = provider.getSigner() // 持有使用者的私鑰並以此簽核 (Signer)
        const ShopPortalContract = new ethers.Contract(contractAddress, contractABI.abi, signer)

        // const newCost_ether = ethers.utils.parseUnits(newCost.toString(), 18)
        const newCost_wei = newCost_ether * 1e18

        // 呼叫合約函數
        const mintTxn = await ShopPortalContract.setCost(newCost_wei)
        showCost.value = (await ShopPortalContract.cost())

        console.log('Setting....', mintTxn.hash)
        await mintTxn.wait()
        console.log('Set -- ', mintTxn.hash)
      }
      else {
        console.log('Ethereum object doesn\'t exist!')
      }
    }
    catch (error) {
      setLoader(false)
      console.log(error)
    }
  }

  async function setmaxMintAmount(maxMintAmount: any) {
    console.log('setting loader')
    setLoader(true)
    try {
      const { ethereum } = window
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum)
        const signer = provider.getSigner() // 持有使用者的私鑰並以此簽核 (Signer)
        const ShopPortalContract = new ethers.Contract(contractAddress, contractABI.abi, signer)

        // 呼叫合約函數
        const mintTxn = await ShopPortalContract.setmaxMintAmount(maxMintAmount)
        showMaxMintAmount.value = (await ShopPortalContract.maxMintAmount())

        console.log('Setting....', mintTxn.hash)
        await mintTxn.wait()
        console.log('Set -- ', mintTxn.hash)
      }
      else {
        console.log('Ethereum object doesn\'t exist!')
      }
    }
    catch (error) {
      setLoader(false)
      console.log(error)
    }
  }

  async function setMaxSupply(maxSupply: any) {
    console.log('setting loader')
    setLoader(true)
    try {
      const { ethereum } = window
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum)
        const signer = provider.getSigner() // 持有使用者的私鑰並以此簽核 (Signer)
        const ShopPortalContract = new ethers.Contract(contractAddress, contractABI.abi, signer)

        // 呼叫合約函數
        const mintTxn = await ShopPortalContract.setMaxSupply(maxSupply)
        showMaxSupply.value = await ShopPortalContract.maxSupply()

        console.log('Setting....', mintTxn.hash)
        await mintTxn.wait()
        console.log('Set -- ', mintTxn.hash)
      }
      else {
        console.log('Ethereum object doesn\'t exist!')
      }
    }
    catch (error) {
      setLoader(false)
      console.log(error)
    }
  }

  // --------------------------------------------------------------

  async function connectWallet() {
    try {
      const { ethereum } = window
      if (!ethereum) {
        alert('Must connect to MetaMask!')
        return
      }

      // 授權獲取帳戶
      const myAccounts = await ethereum.request({ method: 'eth_requestAccounts' })

      console.log('Connected: ', myAccounts[0])
      account.value = myAccounts[0]
      Account.value = myAccounts[0]

      await getBalance()
      await walletOfOwner(myAccounts[0])
    }
    catch (error) {
      console.log(error)
    }
  }

  // ------------------------------------------------

  function setLoader(value: boolean) {
    console.log('setloader', value)
    loading.value = value
  }

  return {
    setLoader,
    loading,
    connectWallet,
    account,
    Account,
    Amount,
    Sig,
    Onlyowner,
    showURI,
    showCost,
    showMaxMintAmount,
    showMaxSupply,
    showPaused,
    showTokenIds,
    showTokenURI,
    showSupply,
    info,
    showBalance,
    sum,
    getBalance,
    viewInfo,
    mint,
    withdraw,
    walletOfOwner,
    tokenURI,
    pause,
    setBaseURI,
    setCost,
    setmaxMintAmount,
    setMaxSupply,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useCryptoStore, import.meta.hot))
