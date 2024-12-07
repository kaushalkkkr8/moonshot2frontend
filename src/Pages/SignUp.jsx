
const SignUp = () => {
  return (
    <>
    <section className="" style={{ backgroundColor: "#9A616D",height:"vh-100" }}>
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col col-xl-10">
              <div className="card" style={{ borderRadius: "1rem" }}>
                <div className="row g-0">
                  <div className="col-md-6 col-lg-5 d-none d-md-block">
                    <img src="https://thumbs.dreamstime.com/b/smart-phone-windows-background-using-back-ground-55998288.jpg" alt="login form" className="img-fluid" style={{ borderRadius: "1rem 0 0 1rem" }} />
                  </div>
                  <div className="col-md-6 col-lg-7 d-flex align-items-center">
                    <div className="card-body p-4 p-lg-5 text-black">
                      <form>
                        <div className="d-flex align-items-center mb-3 pb-1">
                         
                          <h1 className="fw-bold mb-0">Company Logo</h1>
                        </div>

                        <h5 className="fw-normal  pb-3" style={{ letterSpacing: "1px" }}>
                         Register Here
                        </h5>

                        <div data-mdb-input-init className="form-outline mb-4">
                        <label className="form-label" for="form2Example17">
                            Email address
                          </label>
                          <input type="email" id="form2Example17" className="form-control form-control-lg" />
                         
                        </div>

                        <div data-mdb-input-init className="form-outline mb-4">
                        <label className="form-label" for="form2Example27">
                            Password
                          </label>
                          <input type="password" id="form2Example27" className="form-control form-control-lg" />
                         
                        </div>

                        <div className="pt-1 mb-4">
                          <button data-mdb-button-init data-mdb-ripple-init className="btn btn-dark btn-lg btn-block" type="button">
                         SIGN UP
                          </button>
                        </div>
                       
                     
                     
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default SignUp;
