/* eslint-disable multiline-ternary */
import React from "react";
import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { getCurrentUserId, getUserById } from "../../../store/users";
import CommentsList from "../../ui/CommentsList";
import Profession from "../../ui/profession";
import Qualities from "../../ui/qualities";

const UserPage = () => {
  const history = useHistory();
  const { userId } = useParams();
  const user = useSelector(getUserById(userId));
  const currentUserId = useSelector(getCurrentUserId());

  return (
    <div className="container">
      <div className="row gutters-sm">
        {!user && <p>Loading...</p>}
        {user && (
          <>
            <div className="col-md-4 mb-3">
              <div className="card mb-3">
                <div className="card-body">
                  {user._id === currentUserId && (
                    <button
                      onClick={() => history.push(`/users/${userId}/edit`)}
                      type="button"
                      className="position-absolute top-0 end-0 btn btn-light btn-sm"
                      style={{ zIndex: "1" }}
                    >
                      <i className="bi bi-gear"></i>
                    </button>
                  )}

                  <div className="d-flex flex-column align-items-center text-center position-relative">
                    <img
                      src={user.image}
                      className="rounded-circle"
                      width="150"
                    />
                    <div className="mt-3">
                      <h4>{user.name}</h4>
                      <p className="text-secondary mb-1">
                        <Profession id={user.profession} />
                      </p>
                      <div className="text-muted">
                        <i
                          className="bi bi-caret-down-fill text-primary"
                          role="button"
                        ></i>
                        <i
                          className="bi bi-caret-up text-secondary"
                          role="button"
                        ></i>
                        <span className="ms-2">{user.rate}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="card mb-3">
                <div className="card-body d-flex flex-column justify-content-center text-center">
                  <h5 className="card-title">
                    <span>Qualities</span>
                  </h5>

                  <p className="card-text">
                    <Qualities qualities={user.qualities} />
                  </p>
                </div>
              </div>
              <div className="card mb-3">
                <div className="card-body d-flex flex-column justify-content-center text-center">
                  <h5 className="card-title">
                    <span>Completed meetings</span>
                  </h5>

                  <h1 className="display-1">{user.completedMeetings}</h1>
                </div>
              </div>
            </div>

            <div className="col-md-8">
              <CommentsList />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default UserPage;
