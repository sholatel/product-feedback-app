// update status single component

export const Status = ({statusType,statusCount}) => {
    
    // function for determining the status color based on the status type
    const statusColor = ()=> {
        switch(statusType) {
            case 'Planned':               
                return '#F49F85'        
            case 'In-Progress':               
                return  '#AD1FEA'
            case 'Live':
                return '#62BCFA'
        }
    }

    return (
        <li key={statusType} className='list-none m-0 flex flex-row justify-between'>
            <div className="m-0 flex flex-row items-center gap-4 ">
                <p  className="m-0 w-2 h-2 rounded-full" style={{backgroundColor:statusColor()}}></p>
                <p className="m-0 font-normal text-body1 text-status">{statusType}</p>                
            </div> 
            <div className='m-0'>
                <p className="status-count body-1 text-body1 text-status font-bold">{statusCount}</p>
            </div>
       </li>
    )
}