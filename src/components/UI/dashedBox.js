

const dashedBox = ({img,size,background}) => {
    const styling={
        postion:'relative',
        backgroundImage:`url(${img})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition:"center",
        width:size,
        borderRadius:'10%'
    }
    const stylingBg={
        paddingBottom:'100%',
        width:'100%',
        backgroundColor:background?'rgba(255,255,255,0.5)':null,
        borderRadius:'10%',
        border:'#fff dashed 2px',
    }
    return (
        <div style={styling}><div style={stylingBg}></div></div>
    )
}

export default dashedBox
