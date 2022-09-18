import { Box, Input, Text, Flex, Button, Textarea, ButtonProps, Switch, Image,useToast } from "@chakra-ui/react"
import { useState, useEffect, ReactElement } from "react"
import { LockIcon, ArrowForwardIcon, AddIcon } from "@chakra-ui/icons"
import styles from "@styles/Home.module.css"
import IPFSIcon from "@assets/ipfs";
import TextIcon from "@assets/text";
import JSONIcon from "@assets/json";
import { ethers } from 'ethers';
import useEncrytp from "@hooks/useEncrypt";
import { useRouter } from "next/router";
import { generateKey } from "@utils/utils";
import { useDispatch } from "react-redux";
import { useAPI } from "@hooks/useApi";

const Home = () => {
  const [search, setSearch] = useState<string>("");
  const [pubkey, setPubkey] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [selected, setSelected] = useState<"Text" | "JSON" | "IPFS" | "doc" | null>(null);
  const [isChecked, setIsChecked] = useState<boolean>(false)
  const [provider, setProvider] = useState<any>(null);
  const [walletAddress, setWalletAddress] = useState<any>(null);
  const [alice, setAlice] = useState<any>(undefined);
  const [bob, setBob] = useState<any>(undefined);
  const [policy, setPolicy] = useState<any>('');
  const [nucypher, setNucypher] = useState<any>(null);
  const router = useRouter();
  const { sendPost } = useEncrytp();
  const toast = useToast();
  const dispatch = useDispatch()

  const loadNucypher = async () => {
    const nucypherModule = await import('@nucypher/nucypher-ts');
    setNucypher(nucypherModule);
    loadWeb3Provider();
  };

  const loadWeb3Provider = async () => {
    //@ts-ignore:
    if (!window?.ethereum) {
      console.error('You need to connect to the MetaMask extension');
    }
    //@ts-ignore:
    const provider = new ethers.providers.Web3Provider(window.ethereum as any);

    const networkData = await provider.getNetwork();
    if (![137, 80001].includes(networkData.chainId)) {
      console.error('You need to connect to the Mumbai or Polygon network');
    }

    const accounts = await provider.send('eth_requestAccounts', []);

    setWalletAddress(accounts[0])
    dispatch({ type: "ADDRESS", data: accounts[0] })
    setProvider(provider);


  };

  const {sendKeys} = useAPI();

  const personalSign = async () => {
    const exampleMessage = walletAddress;
    try {
      const from = walletAddress;
      const msg = `0x${Buffer.from(exampleMessage, 'utf8').toString('hex')}`;
      //@ts-ignore:
      const sign = await window.ethereum.request({
        method: 'personal_sign',
        params: [msg, from, 'Example password'],
      });
      window.localStorage.setItem("sign", sign);
    } catch (err) {
      console.error(err);
    }
  };

  // useEffect(()=>{
  //   if(provider && nucypher && walletAddress){
  //           //@ts-ignore:
  //           const key = window.localStorage.getItem("se-enc")
  //          if(key){
  //           // const key1 = generateKey(walletAddress);
  //              makeAlice(key)
  //              makeBob()
  //              setPolicy('');
  //          }else{
  //           const key = generateKey(walletAddress);
  //           makeAlice(key)
  //           makeBob()
  //           setPolicy('');
  //          }
  //       }
  // },[provider,nucypher,walletAddress ])

  useEffect(() => {
    if (walletAddress) {
      const newKey = window.localStorage.getItem("sign")
      if (newKey == null) {
        personalSign()
      }
    }
  }, [walletAddress])


  const config = {
    // Public Porter endpoint on Ibex network
    porterUri: 'https://porter-ibex.nucypher.community',
  };

  const makeAlice = (key: string) => {
    // const secretKey = nucypher.SecretKey.fromBytes(Buffer.from('fake-secret-key-32-bytes-alice-x'));
    const secretKey = nucypher.SecretKey.fromBytes(Buffer.from(key));
    const alice = nucypher.Alice.fromSecretKey(
      config,
      secretKey,
      provider
    );
    setAlice(alice);
    makeRemoteAlice(alice);
  };

  const makeBob = () => {
    const secretKey = nucypher.SecretKey.fromBytes(Buffer.from('fake-secret-key-32-bytes-bob-xxx'));
    const bob = nucypher.Bob.fromSecretKey(config, secretKey);
    setBob(bob);
  };

  const makeRemoteAlice = (alice: any) => {
    const { decryptingKey, verifyingKey } = alice;
    return { decryptingKey, verifyingKey };
  };

  const makeRemoteBob = (bob: any) => {
    const { decryptingKey, verifyingKey } = bob;
    return { decryptingKey, verifyingKey };
  };

  const getRandomLabel = () => `label-${new Date().getTime()}`;


  //   const makeCharacters = () => {
  //     makeAlice();
  //     makeBob();
  //     setPolicy('');
  //   };


  const handlePost = async () => {
    if (selected) {
      const res = await sendPost(message, walletAddress, selected.toLowerCase())
      if(res.message === "document indexed successfully"){
        toast({
          title: 'Post created.',
          description: "We've created your encrypted post.",
          status: 'success',
          duration: 3000,
          isClosable: true,
        })
      }
    }
  }


  useEffect(() => {
    // loadNucypher();
    loadWeb3Provider();
  }, [])




  const handlePolicy = async () => {
    const remoteBob = makeRemoteBob(bob);
    const threshold = 2
    const shares = 3
    const startDate = new Date()
    const endDate = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30) // In 30 days
    const policyParams = {
      bob: remoteBob,
      label: getRandomLabel(),
      threshold,
      shares,
      startDate,
      endDate
    };
    const includeUrsulas: any[] = [];
    const excludeUrsulas: any[] = [];

    const policy = await alice.grant(
      policyParams,
      includeUrsulas,
      excludeUrsulas
    );
    setPolicy(policy);

  }

  const handleEncryption = async () => {
    const enrico = new nucypher.Enrico(alice.verifyingKey);
    const encryptedMessage = enrico.encryptMessage(new TextEncoder().encode(message))

    const retriveMessage = await bob.retrieveAndDecrypt(
      policy.policyKey,
      alice.verifyingKey,
      [encryptedMessage],
      policy.encryptedTreasureMap
    )

  }


  return <Box width="100%">

    {/* <Button onClick={()=>console.log("generateEncryptedMessage", generateEncryptedMessage("this is encrypted"))
}>makeAlice</Button> */}
    {/* <Button onClick={handleEncryption}>encrypt</Button> */}
    {/* <Button onClick={personalSign}>sign</Button> */}

    {/* <Button onClick={handlePolicy}>create Policy</Button> */}
    {/* <Button onClick={handleEncryption}>encrypt data</Button> */}

    <Flex justifyContent="flex-end" position="relative" cursor="pointer" as="a" href="/">
      <Text color="green.main" fontSize="50px" fontWeight="700">encrypted</Text>
      <Text color="green.main" fontSize="50px" fontWeight="700"
        position="absolute" right="-70px" top="130"
        className={styles.vertical}>ncrypted</Text>
    </Flex>
    <Box w="max-content">
      <Input placeholder='Search for encrypted data'
        height="48px" mt="23px"
        borderColor="brand.400" width="600px" borderWidth="2px"
        _hover={{
          borderColor: "brand.400"
        }}
        _active={{
          borderColor: "brand.400",
        }}
        _focus={{
          borderColor: "brand.400",
          boxShadow: "none !important"
        }}
        color="Text_Main"
        value={search} onChange={(e) => setSearch(e.target.value)}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            // Cancel the default action, if needed
            event.preventDefault();
            // Trigger the button element with a click
            router.push(`/search?q=${search}`)
          }
        }} />

      <Flex mt="36px" maxW="435px" gap="20px">
        <Text fontSize="30px" fontWeight="700" color="pink.main">Upload</Text>
        <CButton leftIcon={<TextIcon />} onClick={(text: any) => setSelected(text)} selected={selected} text="Text" gray />
        {/* <CButton leftIcon={<JSONIcon />}  onClick={(text:any) => setSelected(text)}  selected={selected} text="JSON" gray/> */}
        <CButton leftIcon={<IPFSIcon />} onClick={(text: any) => setSelected(text)} selected={selected} text="IPFS" gray />
      </Flex>

      {selected && <Flex width="100%" mt="29px">
        <Box maxW="435px" w="100%">
          <Textarea placeholder="Type in your deepest darkest secrets. It'll be safe with us." bg="Text_Main" borderWidth="2px"
            borderColor="brand.400" fontSize="14px" fontWeight="400"
            _hover={{
              borderColor: "brand.400"
            }}
            _active={{
              borderColor: "brand.400",
            }}
            _focus={{
              borderColor: "brand.400",
              boxShadow: "none !important"
            }}
            value={message} onChange={(e) => setMessage(e.target.value)}
          />
          {/* @ts-ignore: */}
          <CButton mt="20px" text="Private Magic" onClick={handlePost} color="black.main" backgroundColor="pink.main" rightIcon={<ArrowForwardIcon />} />
          <Flex mt="20px" gap="10px" alignItems="center">
            <Text color="Text_Main" fontSize="16px" fontWeight="600">Share Symmetric Key</Text>
            <Switch size='md' isChecked={isChecked} onChange={() => setIsChecked(!isChecked)} />
          </Flex>

          {isChecked && <>
            <Textarea mt="20px" placeholder="Enter Public Key. Comma separated please 🙏" bg="Text_Main" borderWidth="2px"
              borderColor="brand.400" fontSize="14px" fontWeight="400"
              _hover={{
                borderColor: "brand.400",
                color: "black.main"
              }}
              _active={{
                borderColor: "brand.400",
                color: "black.main"
              }}
              _focus={{
                borderColor: "brand.400",
                boxShadow: "none !important",
                color: "black.main"
              }}
              value={pubkey} onChange={(e) => setPubkey(e.target.value)}
            />
            {/* @ts-ignore: */}
            <CButton mt="20px" text="Beep Boop" onClick={() => sendKeys(pubkey)} color="black.main" backgroundColor="pink.main" rightIcon={<AddIcon />} />
          </>}
        </Box>
      </Flex>}
    </Box>
  </Box>
}

export default Home

interface CButtonProps {
  text: string;
  leftIcon?: ReactElement;
  onClick: (text: string) => void;
  selected?: string | null;
  rest?: ButtonProps
  gray?: boolean
}
const CButton = ({ leftIcon, text, onClick, selected, gray = false, ...rest }: CButtonProps) => {
  return <Button variant="outline" leftIcon={leftIcon} onClick={() => onClick(text)} bg={selected === text ? "Base_Divider" : "transparent"}
    borderColor="Base_Divider" color="Text_Main" {...rest}
    _hover={{
      backgroundColor: gray ? "Base_Divider" : "pink.200"
    }}
  >{text}</Button>
}
