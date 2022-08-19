import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import "./BordModal.css";
import { useForm } from "react-hook-form";
import img from "./../../assest/image/abstract-board.png";
import bg1 from "../../assest/image/bg1.jpg";
import bg2 from "../../assest/image/bg2.jpg";
import bg3 from "../../assest/image/bg3.jpg";
import bg4 from "../../assest/image/bg4.jpg";
import bg5 from "../../assest/image/bg5.jpg";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { setWorkspaceID } from "../../global-state/actions/reduxActions";
import axios from "axios";

const BoardModal = () => {
  const lastWorkspaceID = useSelector(state => state.lastWorkspaceID)
  const allWorkspace = useSelector(state => state.workspace)
  // console.log(lastWorkspaceID);
  // console.log(allWorkspace);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const [background, setBackground] = useState("");

  const navigate = useNavigate();


  const onSubmit = async (data) => {
    // console.log(data);
    let { title, visibility, workspaceID } = data;

    workspaceID = lastWorkspaceID;

    const newBoard = {
      workspaceID: workspaceID,
      title: title,
      visibility: visibility,
    };
    // console.log(newBoard);
    const res = await axios.post('https://morning-coast-54182.herokuapp.com/board', newBoard)
    console.log(res)
    // navigate("/board-details");

    reset();
  };

  // Handle Board Background Image

  const handleBg1 = () => {
    document.querySelector(".b-modal-bg").style.background = `url(${bg1}) center center/cover`;
  };
  const handleBg2 = () => {
    document.querySelector(".b-modal-bg").style.background = `url(${bg2}) center center/cover`;
  };
  const handleBg3 = () => {
    document.querySelector(".b-modal-bg").style.background = `url(${bg3}) center center/cover`;
  };
  const handleBg4 = () => {
    document.querySelector(".b-modal-bg").style.background = `url(${bg4}) center center/cover`;
  };
  const handleBg5 = () => {
    document.querySelector(".b-modal-bg").style.background = `url(${bg5}) center center/cover`;
  };


  // Handle Board Background Color

  const handleBg6 = () => {
    document.querySelector(".b-modal-bg").style.background = '#172b4d';
  };
  const handleBg7 = () => {
    document.querySelector(".b-modal-bg").style.background = '#eb5a46';
  };
  const handleBg8 = () => {
    document.querySelector(".b-modal-bg").style.background = '#4caf50';
  };
  const handleBg9 = () => {
    document.querySelector(".b-modal-bg").style.background = '#9c27b0';
  };
  const handleBg10 = () => {
    document.querySelector(".b-modal-bg").style.background = '#075D6C';
  };

  return (
    <div className="">
      {/* <!-- Put this part before </body> tag --> */}
      <input type="checkbox" id="my-modal-6" className="modal-toggle" />
      <div className="modal modal-top sm:modal-middle">
        <div className="workspace-modal lg:w-1/3">
          <div className="flex flex-row-reverse w-full">
            <button className="fixed">
              <label htmlFor="my-modal-6" className="">
                <FaTimes className="text-xl hover:cursor-pointer"></FaTimes>
              </label>
            </button>{" "}
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className=" mt-8"
            id="wordspace-form-card"
          >
            <h3 className="font-bold text-2xl uppercase board-modal-title text-center">
              Create Board
              <hr className="h-[2px] w-1/2 mx-auto bg-gray-900 my-3" />
            </h3>

            <div className="flex bg-center bg-contain bg-cover items-center b-modal-bg">
              <img src={img} className="" alt="" />
            </div>
            <p className="font-bold text-primary">Select Background</p>
            <div className="grid grid-cols-5 gap-1 justify-center items-center py-1 overflow-hidden">
              <img src={bg1} onClick={handleBg1} className=" cursor-pointer mx-auto h-16 w-16 rounded-xl bg-clip-padding" alt="" />
              <img src={bg2} onClick={handleBg2} className=" cursor-pointer mx-auto h-16 w-16 rounded-xl bg-clip-padding" alt="" />
              <img src={bg3} onClick={handleBg3} className=" cursor-pointer mx-auto h-16 w-16 rounded-xl bg-clip-padding" alt="" />
              <img src={bg4} onClick={handleBg4} className=" cursor-pointer mx-auto h-16 w-16 rounded-xl bg-clip-padding" alt="" />
              <img src={bg5} onClick={handleBg5} className=" cursor-pointer mx-auto h-16 w-16 rounded-xl bg-clip-padding" alt="" />
              <div onClick={handleBg6} className="h-12 w-16 bg-[#172b4d] rounded-xl  cursor-pointer mx-auto"></div>
              <div onClick={handleBg7} className="h-12 w-16 bg-[#eb5a46] rounded-xl  cursor-pointer mx-auto"></div>
              <div onClick={handleBg8} className="h-12 w-16 bg-[#4caf50] rounded-xl  cursor-pointer mx-auto"></div>
              <div onClick={handleBg9} className="h-12 w-16 bg-[#9c27b0] rounded-xl  cursor-pointer mx-auto"></div>
              <div onClick={handleBg10} className="h-12 w-16 bg-[#075D6C] rounded-xl text-white justify-center text-center text-3xl   cursor-pointer mx-auto">...</div>

            </div>
            <div className="form-control w-full mb-4">
              <label className="label">
                <span className="text-sm font-bold board-modal-title">
                  Board Title
                </span>
              </label>
              <input
                type="text"
                placeholder="type your board tittle"
                {...register("title")}
                className="input input-bordered w-full"
                required
              />
              <label className="label">Board title is required </label>
              <label className="label">
                {errors.boardTitle?.type === "required" && (
                  <span className="label-text-alt text-red-500">
                    {errors.boardTitle.message}
                  </span>
                )}
              </label>
            </div>
            <div className="form-control w-full mb-4">
              <label className="label">
                <span className="text-sm font-bold board-modal-title">
                  Workspace
                </span>
              </label>
              <select
                value={lastWorkspaceID}

                className="select select-bordered select-sm w-full h-[40px] mt-2"
                {...register("workspaceID", {
                  onChange: (e) => { dispatch(setWorkspaceID(e.target.value)) }
                })}
              >
                {
                  allWorkspace?.map(item =>
                    <option key={item?._id} value={item?._id}>{item?.title}</option>
                  )
                }
              </select>
              <label className="label">Select your workspace </label>
              <label className="label">
                {errors.boardTitle?.type === "required" && (
                  <span className="label-text-alt text-red-500">
                    {errors.boardTitle.message}
                  </span>
                )}
              </label>
            </div>

            <div>
              <p className="text-sm font-bold board-modal-title">Visibility</p>
              <select
                defaultValue={"workspace"}
                className="select select-bordered select-sm w-full h-[40px] mt-2"
                {...register("visibility")}
              >
                <option>Private</option>
                <option value="workspace">Workspace</option>
                <option>Public</option>
              </select>

              <p className="text-justify text-sm my-1">This Workspace has 6 boards remaining. Free Workspaces can only have 10 open boards. For unlimited boards, upgrade your Workspace.</p>
            </div>

            <div className="flex justify-center my-3">

              <div className="w-2/3">
                <button
                  type="submit"
                  className="w-full cursor-pointer p-2 pl-5 pr-5 transition-colors duration-700 transform bg-indigo-500 hover:bg-blue-400 text-gray-100 text-lg rounded-lg focus:border-4 border-indigo-300"
                >
                  <label
                    htmlFor="my-modal-6"
                    className="w-full cursor-pointer p-2 pl-5 pr-5 transition-colors duration-700 transform bg-indigo-500 hover:bg-blue-400 text-gray-100 text-lg rounded-lg focus:border-4 border-indigo-300"
                  >
                    Create Board
                  </label>
                </button>
              </div>

            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BoardModal;