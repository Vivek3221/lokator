import React from "react";
import { connect } from "react-redux";
function Loader(props) {
  const { UI } = props;
  return UI.loading ? (
    <div className="css-loader">
      <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
    </div>
  ) : null;
}

const mapStateToProps = (state) => ({
  UI: state.UI,
});

export default connect(mapStateToProps)(Loader);
