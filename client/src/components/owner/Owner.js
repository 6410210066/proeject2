import 'bootstrap/dist/css/bootstrap.min.css';
import "../owner/owner.css"

export default function Owner (){
    return(
        <>
            <div  className="container-fluid" >
                <div className="row">
                    <div className="col-lg-2 nav">
                        nav
                    </div>
                    <div className="col-lg-10 content" style={{background : "#223322"}}>
                        <h1>Owner content</h1>
                    </div>
                </div>
            </div>
        </>
    )
}