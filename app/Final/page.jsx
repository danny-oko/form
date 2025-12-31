import React from "react";

const Final = () => {
  return (
    <div className="w-full h-[100vh] flex flex-col items-center justify-center bg-main bg-main">
      <section className="container w-[480px] h-[192px] bg-white flex items-center justify-center">
        <aside className="inner w-[416px] h-[130px] flex flex-col justify-around">
          <figure className="w-full h-auto flex items-center">
            <img src="/logo.png" alt="" className="w-[60px] h-[60px]" />
          </figure>
          <aside className="text-container">
            <h1 className="text-title text-[26px] font-[600]">
              You're All Set 🔥
            </h1>
          </aside>
          <aside>
            <p className="text-[18px] text-muted">
              We have received your submission. Thank you!
            </p>
          </aside>
        </aside>
        <div className="data"></div>
      </section>
    </div>
  );
};

export default Final;
