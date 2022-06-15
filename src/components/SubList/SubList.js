import { useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import Popup from "reactjs-popup";
import "./SubList.css";
import { RiDeleteBin2Fill, RiEdit2Line } from "react-icons/ri";
import { BiEdit } from "react-icons/bi";
import { deleteDoc } from "../../utils/firebaseActions";
import plusLogo from "../../images/plusBTN.png";
import AddFromListModal from "../AddFromListModal/AddFromListModal";

const contentStyle = {
  background: "rgb(22, 21, 21)",
  border: "1px solid rgb(22, 21, 21)",
  padding: "0",
};
const overlayStyle = { background: "rgba(0,0,0,0.5)" };
const arrowStyle = { color: "#000" }; // style for an svg element

function SubList({ listsData = {}, noCastPhoto, uid, collectionInfo }) {
  const results = useMemo(() => {
    const data = listsData.data || [];
    return data.map((item, index) => {
      return {
        id: listsData.id[index],
        name: listsData.name[index],
        data: item,
        dataId: listsData.dataId[index],
      };
    });
  }, [listsData]);
  const location = useLocation();
  function handleDeleteList(id) {
    deleteDoc("lists", id);
    Swal.fire({
      title: "Deleted!",
      icon: "success",
      button: false,
      timer: 1500,
      background:
        "radial-gradient( farthest-side at 73% 21%, transparent, rgb(26,29,41) )",
    });
  }

  return (
    <>
      {results?.map((data) => {
        return (
          <div>
            <div className="mylist-new-list" id="mobile-mylist-new-list">
              <Link
                to={{ pathname: `/mylist/${data.id}`, state: { data } }}
                key={data.id}
              >
                <h2 id="mylist-name">{data.name}</h2>
              </Link>

              <RiDeleteBin2Fill
                id="delete-list-btn"
                color={"white"}
                size={"25px"}
                onClick={() => handleDeleteList(data.id)}
              />
              {data.data.length && (
                <Popup
                  trigger={
                    <BiEdit
                      className="editList"
                      color={"white"}
                      size={"25px"}
                    />
                  }
                  modal
                  nested
                  {...{ contentStyle, overlayStyle, arrowStyle }}
                >
                  {(close) => (
                    <div className="new-list-modal">
                      <button className="new-list-close" onClick={close}>
                        &times;
                      </button>
                      <div className="new-list-content">
                        <AddFromListModal
                          uid={uid}
                          collectionInfo={collectionInfo}
                          data={data}
                          close={close}
                          noCastPhoto={noCastPhoto}
                        />
                      </div>
                    </div>
                  )}
                </Popup>
              )}
            </div>

            <div className="mylist-result">
              {!data.data.length && (
                <div className="plusList-wrap">
                  <Popup
                    trigger={
                      <img className="plusList" src={plusLogo} alt="plusList" />
                    }
                    modal
                    nested
                    {...{ contentStyle, overlayStyle, arrowStyle }}
                  >
                    {(close) => (
                      <div className="new-list-modal">
                        <button className="new-list-close" onClick={close}>
                          &times;
                        </button>
                        <div className="new-list-content">
                          <AddFromListModal
                            uid={uid}
                            collectionInfo={collectionInfo}
                            data={data}
                            close={close}
                            noCastPhoto={noCastPhoto}
                          />
                        </div>
                      </div>
                    )}
                  </Popup>
                </div>
              )}

              <div id="list-wrap">
                {data.data.map((result) => {
                  const url = result.poster_path
                    ? `https://image.tmdb.org/t/p/w500${result.poster_path}`
                    : noCastPhoto;
                  return (
                    <Link to={`/movie/${result.id}`} key={result.id}>
                      <div className="mylist-card">
                        <img className="mylist-poster" src={url} alt="" />
                        <div className="mylist-title">
                          {result.original_title}
                        </div>
                        <div className="mylist-rating">
                          {result.vote_average}
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}

export default SubList;
