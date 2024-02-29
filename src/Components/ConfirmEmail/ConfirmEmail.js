import { mainUrl } from "../../Utils/urls";

function ConfirmEmail({ request, status }) {
  return (
    <>
      <div>
        <p>
          Hi {request.sender}
          {" , "}{" "}
        </p>
        <p
          style={{
            paddingLeft: "1.5rem",
          }}
        >
          <b>{request.receiver}</b> has{" "}
          <b>{status === "accepted" && "ACCEPTED"}</b>
          <b>{status === "declined" && "DECLINED"}</b> your{" "}
          <b>{request.type === "invite" ? "INVITE" : "REQUEST"}</b> to join
          their team for the project{"  "}
          <i>
            <a
              href={`${mainUrl}/projects/${request.project_id}`}
              target="_blank"
              rel="noreferrer"
            >
              {request.project}
            </a>
          </i>
        </p>
        <br />
        <p
          style={{
            paddingLeft: "1.5rem",
          }}
        >
          <b>Message : </b>{" "}
          <p
            style={{
              paddingLeft: "1.5rem",
            }}
          >
            {request.message}
          </p>
          </p>
          <br />
        <div>
          <p>
            To view more details , Vist{" "}
            <a
              href={mainUrl}
              target="_blank"
              rel="noreferrer"
            >
              {mainUrl}
            </a>
          </p>
        </div>
        <p>Regards</p>
        <p>IEDC MEC Collab Team</p>
        <br />
        <p>
          NOTE : This is an auto generated email.Please DO NOT REPLY to this
          mail.
        </p>
        <p>
          <i>
            For any queries please visit{" "}
            <a href="https://www.iedcmec.in">https://www.iedcmec.in</a>
          </i>
        </p>
      </div>
    </>
  );
}
export default ConfirmEmail;
