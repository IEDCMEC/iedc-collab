function Email({ request }) {
  return (
    <>
      <div>
        <p>
          Hi {request.receiver}
          {" , "}{" "}
        </p>
        <p
          style={{
            paddingLeft: "1.5rem",
          }}
        >
          <b>{request.sender}</b> has{" "}
          <b>{request.type === "invite" ? "INVITED" : "REQUESTED"}</b> you to
          join their team for the project{"  "}
          <i>
            <a
              href={`https://iedc-collab-frontend.pages.dev/projects/${request.project_id}`}
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
        <p
          style={{
            paddingLeft: "1.5rem",
          }}
        >
          {"- "}
          <b>{request.sender}</b>
        </p>
        <br />
        <div>
          <p>
            To view more details and to accept/decline the{" "}
            {request.type === "invite" ? "invite" : "request"} , Vist{" "}
            <a
              href="https://iedc-collab-frontend.pages.dev"
              target="_blank"
              rel="noreferrer"
            >
              https://iedc-collab-frontend.pages.dev
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
            <a href="https://iedcmec.in" target="_blank" rel="noreferrer">
              https://iedcmec.in
            </a>
          </i>
        </p>
      </div>
    </>
  );
}
export default Email;
