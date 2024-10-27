import { useState } from "react";

function ModalTest() {
  const [showModalPopup, setShowModalPopup] = useState(false);

  function handleToggleModalPopup(){
    setShowModalPopup(!showModalPopup)
  }

  return (
    <div>
      <button onClick={handleToggleModalPopup}>Open Modal PopUp</button>
    </div>
  );
}

export default ModalTest;
