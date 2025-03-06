import React, { useEffect, useState } from "react";
import "./HomePlan.css";
import HomeNav from "./HomNav";

interface details {
  didYesterday: string;
  planToday: string;
  stuckAt: string;
}

const keys = ["didYesterday", "planToday", "stuckAt"];

const HomePlan = () => {
  const [input, setInput] = useState<details>({
    didYesterday: "",
    planToday: "",
    stuckAt: "",
  });

  const [error, setError] = useState<details>({
    didYesterday: "",
    planToday: "",
    stuckAt: "",
  });
  const [isDisabled, setIsDisabled] = useState<boolean>(true);

  useEffect(() => {
    const checkDisable =
      keys.some((key) => input[key as keyof details] === "") ||
      keys.some((key) => error[key as keyof details] !== undefined);

    setIsDisabled(checkDisable);
  }, [error, input]);

  const validate = (name: string, value: string) => {
    switch (name) {
      case "didYesterday":
        if (value.trim().length === 0) return "field is mandatory";
        break;
      case "planToday":
        if (value.trim().length === 0) return "field is mandatory";
        break;
      case "stuckAt":
        if (value.trim().length === 0) return "field is mandatory";
        break;
    }
    return;
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    const result = validate(name, value);

    setError({ ...error, [name]: result });

    setInput({ ...input, [name]: value });

  };

  const handleClick = async(e: React.MouseEvent<HTMLButtonElement>) => {
    
    const body={today:input.planToday,
    yesterday:input.didYesterday,
    stuck:input.stuckAt}
    let authToken=localStorage.getItem("tokenKey")|| ""
    const response = await fetch(
      `https://sample-register.herokuapp.com/getPosts`,
      {
        // body:JSON.stringify(body),

        // body: JSON.stringify(input),
        method: "post",
        headers: { "Content-Type": "application/json" ,
      "authorization":authToken }, // header is optional

      }
    );

    console.log(await response.json())

  };

  
  return (
    <>
    <HomeNav/>
   
    <div className="mainwrapper">
      <div className="datewrapper">
        <div className="date">
          <div className="dateshadow">4th may 2022 wednesday</div>
        </div>
      </div>

      <div className="outer-content-wrapper">
        <div className="error">
          {error.didYesterday && <h6>{error.didYesterday}</h6>}
        </div>
        <div className="que">1.what did I do yesterday?</div>
        <textarea
          placeholder="Click here to write"
          name="didYesterday"
          value={input.didYesterday}
          onChange={handleChange}
        ></textarea>
      </div>

      <div className="outer-content-wrapper">
        <div className="error">
          {error.planToday && <h6>{error.planToday}</h6>}
        </div>
        <div className="que">2.what I plan for today?</div>
        <textarea
          placeholder="Click here to write"
          name="planToday"
          value={input.planToday}
          onChange={handleChange}
        ></textarea>
      </div>

      <div className="outer-content-wrapper">
        <div className="error">{error.stuckAt && <h6>{error.stuckAt}</h6>}</div>
        <div className="que">3.Where I was stuck at?</div>
        <textarea
          placeholder="Click here to write"
          name="stuckAt"
          value={input.stuckAt}
          onChange={handleChange}
        ></textarea>
      </div>

      <div className="button-wrapper">
        <button onClick={handleClick}>
          <h2>submit</h2>
        </button>
      </div>
    </div>
    </>
  );
};

export default HomePlan;
