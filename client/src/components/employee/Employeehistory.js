import Employeenav from "./Employeenav";
import Form from 'react-bootstrap/Form';

export default function Employeehistory() {
    let page = 2;
        

       
    return (
        <>
            <div className="container-fluid ">
                <div className="row">
                    <div className="col-lg-2  col-sm-12 " style={{ padding: "0" }}>
                        <Employeenav page={page} />
                    </div>
                    <div className="col-lg-10 col-sm-12 content  " style={{ padding: "0" }}>
                        <div className='user-grid'>
                            <h1 className="header">ประวัติ</h1>
                            {/* <Users page={page}/> */}
                            <Form>
                                {['radio'].map((type) => (
                                <div key={`inline-${type}`} className="mb-3">
                                    <Form.Check
                                        inline
                                        label="รายวัน"
                                        name="group1"
                                        type={type}
                                        id={`inline-${type}-1`}
                                    />
                                    <Form.Check
                                        inline
                                        label="รายเดือน"
                                        name="group1"
                                        type={type}
                                        id={`inline-${type}-2`}
                                    />
                                    
                                </div>
                                ))}
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}