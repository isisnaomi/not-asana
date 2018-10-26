import React from 'react';

const Section = (props) => (
      <div className="col-xs-4 col-sm-3 col-lg-2">
        <h4 className="section-title">{props.section.name}</h4>
        <div className="section">
            {props.tasks.map((task) =>
              <div className="section-task" key={task.id}>{task.name}</div>
            )}
        </div>
      </div>
)
export default Section;
