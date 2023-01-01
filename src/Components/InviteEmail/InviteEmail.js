function InviteEmail({ data, member, id }) {
  return (
    <>
      <div>
        <p>
          Hi {member}
          {" , "}{" "}
        </p>
        <p
          style={{
            paddingLeft: "1.5rem",
          }}
        >
          <b>{data.leader_name}</b> has added you to their team for the project
          {"  "}
          <i>
            <a
              href={
                id
                  ? `https://iedc-collab-frontend.pages.dev/projects/${id}`
                  : `https://iedc-collab-frontend.pages.dev/projects/`
              }
              target="_blank"
              rel="noreferrer"
            >
              {data.name}
            </a>
          </i>{" "}
          . Login to{" "}
          <a
            href="https://www.iedc-collab-frontend.pages.dev"
            target="_blank"
            rel="noreferrer"
          >
            IEDC Collab to check out.
          </a>
        </p>
        <br />
        <div>
          <p>
            To view more details , Vist{" "}
            <a
              href="https://www.iedc-collab-frontend.pages.dev"
              target="_blank"
              rel="noreferrer"
            >
              https://www.iedc-collab-frontend.pages.dev
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
export default InviteEmail;
