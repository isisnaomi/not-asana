import React, { Component } from 'react';
import Api from './utils/Api';
import Section from './components/Section';
import Follower from './components/Follower';
import './style/NotAsana.css';

class NotAsana extends Component {
  state = {
    name: "",
    sections: [],
    tasks: [],
    followers: [],
  }

  fetchSection(){
    Api.get('projects/556546605837630/sections',{},{}).then((response) => {
      this.setState({ sections: response.data})
    });
  }

  fetchTasks(){
    Api.get('projects/556546605837630/tasks?opt_expand=memberships,name,notes',{},{}).then((response) => {
      this.setState({ tasks: response.data})
    });
  }

  fetchProject(){
    Api.get('projects/556546605837630',{},{}).then((response) => {
      this.setState({ name: response.data.name})
      this.setState({ followers: response.data.followers})
    });
  }

  componentDidMount(){
    this.fetchProject()
    this.fetchSection()
    this.fetchTasks()
  }

  //Render section with corresponding tasks
  renderSection = section => {
    const sectionTasks = this.state.tasks.filter(task => {
      if(task.memberships[0]['section']){
        return task.memberships[0]['section']['name'] === section.name;
      }
      return false
    })
    return <Section key={section.id} section={section} tasks={sectionTasks}/>
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="header">
          <h2>not asana</h2>
          <p>{this.state.name}</p>
        </div>
        <div className="row justify-content-center">
          {this.state.followers.map((follower) =>
            <Follower key={follower.id} follower={follower}/>
          )}
        </div>
        <div className="row">
          {this.state.sections.map(this.renderSection)}
        </div>
      </div>
    );
  }
}

export default NotAsana;
