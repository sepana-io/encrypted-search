import { Box, Input, Text, Flex, Button, Textarea, ButtonProps, Switch } from "@chakra-ui/react"
import { useState, useEffect, ReactElement } from "react"
import { AddIcon } from "@chakra-ui/icons"
import styles from "@styles/Home.module.css"
import FilterIcon from "@assets/filter"
import { getTime } from "@utils/utils"
import useEncrytp from "@hooks/useEncrypt"
import { useRouter } from "next/router"
import { useAPI } from "@hooks/useApi"

const Search = () => {
    const [search, setSearch] = useState<string>("");
    const [isChecked, setIsChecked] = useState<boolean>(false);
    const [postData, setPostData] = useState<any>([])
    const [keys, setKeys] = useState<any>(null)
    const { getPosts } = useEncrytp();
    const router = useRouter();
    const {getKeys} = useAPI();

    function isJsonString(str:string) {
        try {
            JSON.parse(str);
        } catch (e) {
            return false;
        }
        return true;
    }

    const checkData = async()=>{
        const res:any = await getKeys("3153cdf50918b58421fd5459f2832a1712164d71f562d0a6f654870e52c3159bbeb76e1c80eeeaa5ac885fcebf38cd02c016ce1f34544555798b1d13673d18d1");
        let x =[]
        const resData = res.data.exchange_data;
        for(let i=0; i<resData.length; i++){
            x.push({
                private_key: isJsonString(resData[i]._source.aes_key) ? JSON.parse(resData[i]._source.aes_key):resData[i]._source.aes_key
            })
        }
        console.log("x",x)
        setKeys(x)
    }
    useEffect(() => {
        if (router.query.q) {
            setSearch(router.query.q as string)
            getData(router.query.q as string)
            // checkData()
        }
    }, [router])

    const handleSearch = async () => {
        router.replace({
            pathname: "/search",
            query: { q: search }
        })
    }

    const getData = async (text: string) => {
         const res:any = await getKeys("3153cdf50918b58421fd5459f2832a1712164d71f562d0a6f654870e52c3159bbeb76e1c80eeeaa5ac885fcebf38cd02c016ce1f34544555798b1d13673d18d1");
        let x =[]
        const resData = res.data.exchange_data;
        for(let i=0; i<resData.length; i++){
            x.push({
                private_key: isJsonString(resData[i]._source.aes_key) ? JSON.parse(resData[i]._source.aes_key):resData[i]._source.aes_key
            })
        }
        console.log("x",x)
        setKeys(x)
        const data = await getPosts(text, x);
        setPostData(data)
    }

    return <Box width="100%">
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
                        handleSearch();
                    }
                }}
            />


            <Flex width="100%" mt="29px">

                <Box w="100%">

                    <FilterButton onClick={() => setIsChecked(!isChecked)} isActive={isChecked} />

                    {isChecked && <FilterTable />}

                    {/* <Flex mt="30px" borderWidth="2px" borderColor="brand.400" borderRadius="6px" h="98px" w="100%" bg="Text_Main" p="9px" flexDirection="column" justifyContent="space-between">
            <Text fontSize="16px" fontWeight="400" color="black.main">Welcome to <Box as="span" color="brand.400">ETHBerlin</Box>. It’s so great to see you and your team hacking here! </Text>
            <Text fontSize="14px" fontWeight="400" color="rgba(0, 0, 0, 0.36)">{getTime()}</Text>
        </Flex> */}

                    {postData.map((item: any, index: number) => {
                        return <Flex key={index} mt="30px" borderWidth="2px" borderColor="brand.400" borderRadius="6px" h="98px" w="100%" bg="Text_Main" p="9px" flexDirection="column" justifyContent="space-between">
                            <Text fontSize="16px" fontWeight="400" color="black.main">{item._source.dtext}</Text>
                            <Text fontSize="14px" fontWeight="400" color="rgba(0, 0, 0, 0.36)">{getTime(item._source.created)}</Text>
                        </Flex>
                    })}


                    {/* <Flex mt="20px" borderWidth="2px" borderColor="brand.400" borderRadius="6px" h="98px" w="100%" bg="Text_Main" p="9px" flexDirection="column" justifyContent="space-between">
            <Text fontSize="16px" fontWeight="400" color="black.main">Welcome to <Box as="span" color="brand.400">ETHBerlin</Box>. It’s so great to see you and your team hacking here! </Text>
            <Text fontSize="14px" fontWeight="400" color="rgba(0, 0, 0, 0.36)">{getTime()}</Text>
        </Flex> */}

                    {/* @ts-ignore: */}
                    <CButton my="20px" text="Load More" onClick={() => null} color="black.main" backgroundColor="pink.main" leftIcon={<AddIcon />} />

                </Box>
            </Flex>
        </Box>
    </Box>
}

export default Search

interface CButtonProps {
    text: string;
    leftIcon?: ReactElement;
    onClick: (text: string) => void;
    selected?: string;
    rest?: ButtonProps
}
const CButton = ({ leftIcon, text, onClick, selected, ...rest }: CButtonProps) => {
    return <Button variant="outline" leftIcon={leftIcon} onClick={() => onClick(text)} bg={selected === text ? "Base_Divider" : "transparent"}
        borderColor="Base_Divider" color="Text_Main" {...rest}>{text}</Button>
}

interface FilterTableProps {
    onChange?:(data:any)=>void;
}
const FilterTable = ({onChange}:FilterTableProps) => {
    const sortData = ["Last Uploaded", "First Uploaded"]
    const typeData = ["All", "Text", "IPFS"]
    const accessData = ["All", "Shared", "Not Shared"]
    const dateData = ["From:", "To:"]

    const [sort, setSort] = useState<number>(0)
    const [type, setType] = useState<number>(0)
    const [access, setAccess] = useState<number>(0)
    const [date, setDate] = useState<number>(0)

    //  To-Do
    // useEffect(()=>[
    //     onChange()
    // ],[sortData,typeData,accessData])

    return <Flex justifyContent="space-between" p="15px 25px" borderWidth="2px" borderRadius="6px" borderColor="pink.main" mt="10px">
        <Box maxWidth="115px" width="100%">
            <Head title="Sort" />
            <Flex flexDirection="column" alignItems="start">
                {sortData.map((item: string, index: number) => {
                    return <List title={item} key={`sort${index}`} index={index} selected={sort} onClick={(index: number) => setSort(index)} />
                })}
            </Flex>
        </Box>
        <Box maxWidth="115px" width="100%">
            <Head title="Type" />
            <Flex flexDirection="column" alignItems="start">
                {typeData.map((item: string, index: number) => {
                    return <List title={item} key={`sort${index}`} index={index} selected={type} onClick={(index: number) => setType(index)} />
                })}
            </Flex>
        </Box>
        <Box maxWidth="115px" width="100%">
            <Head title="Access" />
            <Flex flexDirection="column" alignItems="start">
                {accessData.map((item: string, index: number) => {
                    return <List title={item} key={`sort${index}`} index={index} selected={access} onClick={(index: number) => setAccess(index)} />
                })}
            </Flex>
        </Box>

        <Box maxWidth="115px" width="100%">
            <Head title="Date" />
            <Flex flexDirection="column" alignItems="start">
                {dateData.map((item: string, index: number) => {
                    return <List title={item} key={`sort${index}`} index={index} selected={date} onClick={(index: number) => setDate(index)} />
                })}
            </Flex>
        </Box>

    </Flex>
}

interface HeadProps {
    title: string
}

const Head = ({ title }: HeadProps) => {
    return <Box borderBottomWidth="1px" borderColor="pink.main" width="100%">
        <Text color="Text_Main" fontSize="16px" fontWeight="700">{title}</Text>
    </Box>
}

interface ListProps {
    title: string;
    onClick: (index: number) => void;
    index: number;
    selected: number;
}
const List = ({ title, onClick, index, selected }: ListProps) => {

    return <Box as="button" onClick={() => onClick(index)} mt="5px">
        <Text color={index === selected ? "#FEFEFE" : "#6C757D"}>{title}</Text>
    </Box>
}


interface FilterButtonProps {
    onClick: () => void;
    isActive: boolean;
}
const FilterButton = ({ onClick, isActive = false }: FilterButtonProps) => {

    const [isHover, setIsHover] = useState<boolean>(false)

    useEffect(() => {
        setIsHover(isActive)
    }, [isActive])

    return <Flex alignItems="center" as="button" onClick={onClick} onMouseOver={() => setIsHover(true)} onMouseLeave={() => !isActive && setIsHover(false)}>
        <FilterIcon color={isHover ? "#FEFEFE" : "#6C757D"} />
        <Text ml="6px" fontSize="16px" fontWeight="400" color={isHover ? "#FEFEFE" : "#6C757D"}>Last Uploaded</Text>
    </Flex>
}