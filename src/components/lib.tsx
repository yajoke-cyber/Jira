
import { Spin,Typography } from 'antd';
import styled from 'styled-components';
export const Row = styled.div<{
    gap ?:number|boolean,
    between?:boolean,
    marginBottom?:number
}>`
    display: flex;
    align-items: center;
    justify-content: ${props=>props.between?'space-between':undefined};
    justify-content: ${props=>props.marginBottom+'rem'};
    }
    >*{
        margin-top: 0 !important;
        margin-bottom:0 !important;
        margin-right: ${props=>typeof props.gap ==='number'?props.gap+'rem':props.gap?'2rem':undefined};
        
`
export const FullPage=styled.div`
        width: 100vw;
        height: 100vh;
        display: flex;
        justify-content: center;
        align-items: center;
`
export const FullPageSpin=()=>{
    return (
        <FullPage>
        <Spin size='large'></Spin>
    </FullPage>
    )
}
export const FullPageError=({error}:{error:Error|null})=>{
    return (
        <FullPage>
        <Typography.Text>{error?.message}</Typography.Text>
    </FullPage>
    )
}