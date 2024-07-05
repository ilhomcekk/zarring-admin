import "./pageLoading.scss";

const PageLoading = ({ loading }) => {
  return loading ? (
    <>
      <div className="spinner-bg"></div>
      <div className="spinner">
        <div className="double-bounce1"></div>
        <div className="double-bounce2"></div>
      </div>
    </>
  ) : null;
};

export default PageLoading;
