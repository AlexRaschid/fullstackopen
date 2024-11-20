export default function Notificaiton(props){
    if (props.messageError === null && props.messageSuccess === null) {
        return null
      }
    
    return(
        <div >
            {props.messageError && <div className="error">{props.messageError}</div>}
            {props.messageSuccess && <div className="success">{props.messageSuccess}</div>}
        </div>
        
    );
}