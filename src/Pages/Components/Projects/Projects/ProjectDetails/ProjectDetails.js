import React from "react";
import "./ProjectDetails.scss";
import { Row, Col } from "react-bootstrap";

const ProjectDetails = () => {
  return (
    <div className={"d-flex h-100 flex-column "}>
      <Row>
        <Col className={"p-5 shadow-bottom heading col-sm background-color-white"}>
          <div className={"flex-grow-1"}>
            <div>
              <h4>SpaceX</h4>
            </div>
          </div>
          <div className={" fix-flex left-right-margin"}>
            <div>
              <h5 className={"font-weight-light"}>Elon Musk</h5>
            </div>
          </div>
          <div className={"fix-flex"}>
            <div>
              <h5 className={"font-weight-light"}>xyz@gmail.com</h5>
              <h5 className={"font-weight-light"}>987876743</h5>
            </div>
          </div>
        </Col>
      </Row>
      
      <Row className={"p-5 flex-grow-1 overflow"}>
        <div class="contents">
          <div >
            <h2>Description</h2>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quis nibh accumsan, maximus erat ut, facilisis nisl. Nulla sit amet sem dignissim, scelerisque massa nec, pretium metus. Ut lacus tortor, laoreet sit amet ante a, interdum pretium libero. Cras sagittis odio lacus, et dapibus nisl mattis ac. Aliquam erat volutpat. Nam id tortor bibendum nisl imperdiet tempor at ut diam. Praesent tempor nulla et ultricies viverra. Cras sit amet efficitur elit. Integer nec lorem erat. Donec ornare nisi aliquet massa suscipit egestas. Aenean fermentum nec mi egestas ornare. In ac diam tortor. Nunc mollis eu purus vitae ultrices. In hac habitasse platea dictumst.
              Donec enim libero, aliquet lacinia justo at, efficitur hendrerit felis. Cras hendrerit risus nec rutrum gravida. Suspendisse egestas hendrerit pharetra. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis ac nulla ipsum. Nam volutpat quam et felis accumsan aliquet quis a est. Suspendisse pellentesque consectetur massa iaculis ultricies. Etiam pharetra, nisl eu gravida malesuada, ligula turpis convallis urna, ut sollicitudin diam est ac sem. Sed magna purus, tempus sagittis odio lobortis, ultrices hendrerit justo. Integer pharetra mattis consequat. Vivamus pretium at purus eget porta. Donec sit amet dictum nunc, in accumsan massa.
              Cras et libero bibendum, pellentesque dolor et, fermentum neque. Nunc luctus cursus imperdiet. Suspendisse laoreet nec libero sit amet lobortis. Cras et pellentesque enim, et vulputate nulla. Etiam eu suscipit libero. Sed ornare non libero rhoncus rutrum. Vivamus maximus diam quis sem mollis, in eleifend turpis posuere. Morbi tempus lacus et consequat imperdiet. Mauris nec sapien sapien. Pellentesque scelerisque vestibulum massa sed laoreet. In pulvinar semper imperdiet. Aenean et eros convallis dolor pulvinar feugiat ut vitae ante. Cras posuere pellentesque turpis nec iaculis. Nam congue sem lacinia ex gravida iaculis. Quisque accumsan orci non odio interdum, vel feugiat lacus viverra. Aliquam et tempor nisi.
              Curabitur a nisl nec purus facilisis rutrum. In vel quam et tellus scelerisque varius et et sem. Curabitur semper tortor mi, sit amet eleifend sapien euismod eu. Suspendisse egestas dapibus libero, ac pellentesque orci convallis at. Mauris eleifend eu felis a eleifend. Cras consequat arcu et turpis ornare vestibulum. Nam euismod tristique ipsum, ac tincidunt erat suscipit nec. Fusce convallis lacus eget blandit dignissim. Fusce ornare euismod felis quis efficitur. Nulla eu semper nunc. Nullam nunc est, dictum vitae pharetra id, finibus in ante.
              Nam sit amet justo gravida, convallis enim a, pharetra neque. Nam interdum, elit non porta auctor, turpis sapien cursus justo, vel ultrices arcu lacus sit amet erat. Proin tempus mattis massa. Mauris luctus ornare odio et posuere. Morbi dapibus dictum ullamcorper. Quisque faucibus, elit sit amet luctus efficitur, ligula leo posuere odio, ut ullamcorper tellus purus nec quam. Vivamus feugiat fringilla erat sit amet fringilla. Nunc faucibus elit at interdum fermentum. In condimentum aliquam lectus, sed facilisis nulla vehicula quis. Phasellus finibus consequat ornare.
              Vivamus est felis, sodales vel pellentesque vitae, feugiat a risus. Aenean varius neque maximus facilisis placerat. Quisque commodo luctus purus. Donec dictum auctor tellus, in rhoncus sem cursus a. Proin sem neque, lobortis eget orci eu, suscipit laoreet nunc. Proin dapibus sollicitudin magna nec dictum. Nulla facilisi. Sed aliquet lorem sed eros scelerisque vestibulum. Nunc suscipit laoreet varius. Nunc eu sapien volutpat sem pulvinar lacinia. Ut varius rhoncus sem ut malesuada. Donec varius pulvinar tempor.
              Nam posuere sodales turpis, vitae interdum lectus molestie at. Mauris ut cursus felis. Nullam scelerisque turpis eu orci convallis, et scelerisque odio pulvinar. Mauris ullamcorper ligula vel blandit pharetra. Interdum et malesuada fames ac ante ipsum primis in faucibus. Suspendisse suscipit purus eget sem pulvinar imperdiet. Duis et sodales libero, at commodo massa. Sed et efficitur mi, vel tristique ante. Fusce mattis enim id nunc ultrices fermentum. Aenean ac sapien non quam ornare interdum. Vivamus mollis molestie tortor sit amet tincidunt. Vivamus orci mi, laoreet ut nisl non, dignissim mattis neque. Proin vel rhoncus tortor. Quisque tristique molestie leo. Morbi tempus ac justo ac finibus. In turpis metus, tristique in dapibus sit amet, pretium sit amet augue.
              In ultrices arcu sit amet nunc maximus vestibulum vel in erat. Sed tincidunt justo vel odio ornare sagittis. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Aenean rutrum, leo in mollis rutrum, ligula ex tincidunt lacus, convallis cursus tortor justo pretium nisl. Integer ut porta tortor, sed aliquam lacus. Sed aliquam consectetur velit, a tempus risus scelerisque sed. Ut sed vehicula metus. Aliquam erat volutpat. Ut lacinia justo at erat mollis tincidunt. Donec maximus tempus scelerisque. Nunc quis ornare nulla.
              Nulla ac ex quis velit blandit ornare id non quam. Sed ullamcorper bibendum mauris, sit amet elementum lacus gravida ac. Fusce iaculis ex a sagittis sollicitudin. Morbi at purus vitae mauris maximus placerat. In eget augue ut ipsum mollis vulputate a ac libero. Nam vel urna ut est faucibus fermentum iaculis vitae lectus. Curabitur volutpat quam gravida risus consectetur porta. In tempus laoreet feugiat. Aliquam tincidunt ultrices efficitur. Nullam id risus vel felis facilisis maximus. Sed vel mollis risus, non semper lorem. Mauris ut porta dolor. Mauris efficitur purus vel imperdiet euismod. Curabitur ac lectus sed diam tempor congue.
              Aenean quis fermentum erat, placerat vulputate magna. Maecenas ac nibh sit amet felis efficitur cursus. Fusce id vulputate felis. Sed vulputate iaculis sapien non rhoncus. Nullam commodo ultricies ante, id semper magna tincidunt ac. Sed gravida mollis neque. Ut ultricies purus est, vitae egestas augue vehicula non. Pellentesque at vestibulum dolor, bibendum pellentesque metus. Maecenas rutrum viverra quam sed feugiat. Curabitur mattis posuere ipsum vel fringilla. Aliquam erat volutpat.
            <h2>Links</h2>
            <a href="http://spacex.com" target="_blank">spacex.com</a>
          </div>
        </div>
      </Row>
    </div>
  );
};

export default ProjectDetails;
