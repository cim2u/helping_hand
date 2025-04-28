// src/components/ProductGrid.jsx

import React from "react";
import "../style/ProductGrid.css"; // optional if you want separate CSS

const ProductGrid = () => {
  return (
    <div className="product-grid">
      {/* Product 1 */}
      <div className="product-item">
        <img
          src="https://s3-alpha-sig.figma.com/img/4fa2/b3f8/f870a7275fbe1366a676f28195402bd6?Expires=1745193600&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=UColHrM4-CRvdCCPTBH63CswPqYJ5RNZRge7rMeyjBCFjiw0-uoCZDjfaR6CRbfvRHEHWfeSp9~h2fwNO1v3OR1fGsycyUaeQRXbTeo-6-osU60z3b6lE2yduAcQkjxqkA0f2YHszHb3tHT3GWv6lOcxHMaft5ZzdWYsL2yGOTnzI5qIz0SaZzAO~Aj1-UM-x-xTgvpIkuX-nH9BhP1RYA4wOSF0abbAhFYVO2eexMKiOyx5Ot6xkHmoAOr32bCE-7uv7TmowZTeDVn4cmeh0V96J56qzBWpzusW1q7y77rOgr~IC5Cr-xHsgDaWMqaOnTIei7AtF10jqPidtX~7XQ"
          alt="Ribbon Keychain"
          className="product-image"
        />
        <div className="product-name">Ribbon Keychain</div>
      </div>

      {/* Product 2 */}
      <div className="product-item">
        <img
          src="https://s3-alpha-sig.figma.com/img/3ab1/c59c/1a1f07801f5115381349e63f4c14f55e?Expires=1745798400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=HqnOSKBPbWe-~OuAn7WZQGAehGp~l4~D4hpohOnMQknH5MGA1XbjR7GEaOW8xGUO-zNGaZn8QrzF4Fi0I4wAzrH1A5oGV~57e9FrtpixDhhDsIUsjwSGVRQeQPjpETKnBzbLOD9VxKaERq-LWyFnTBWYHBnYQXRcnbmdsrqWk4yWPy6KGptmkyWQnCZTN8GX4SwZiXHpiQ5~9AWAHdKpcOmfhSVlK2FQ3nhM38EKM72fU4L-2UrUuoVGlnEvO8mJnNykJqhy9tak4P~shxu0Jhw8FX~yYs75grTZXu57vyKxyqTgJfYImdJilk9i0Lp9q3gg5X-E2Ww3r1RYbaZygA__"
          alt="Mini Flower Vase"
          className="product-image"
        />
        <div className="product-name">Mini Flower Vase</div>
      </div>
    </div>
  );
};

export default ProductGrid;
