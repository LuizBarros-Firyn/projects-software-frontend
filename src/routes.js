import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import LandingPage from './pages/LandingPage';
import About from './pages/About';
import BugReport from './pages/BugReport';
import Register from './pages/Register';
import ClientRegister from './pages/ClientRegister';
import FreelancerRegister from './pages/FreelancerRegister';
import Login from './pages/Login';
import Main from './pages/Main';
import NewProject from './pages/NewProject';
import NewOffer from './pages/NewOffer';
import OffersReview from './pages/OffersReview';
import OngoingProjects from './pages/OngoingProjects';
import ProjectDevelopment from './pages/ProjectDevelopment';
import CreateTeam from './pages/CreateTeam';
import TeamSettings from './pages/TeamSettings';
import Teams from './pages/Teams';
import Team from './pages/Team';
import TeamJoiningSolicitation from './pages/TeamJoiningSolicitation';
import JoiningSolicitationsReview from './pages/JoiningSolicitationsReview';
import Profile from './pages/Profile';
import TeamProfile from './pages/TeamProfile';
import FreelancerProfileSettings from './pages/FreelancerProfileSettings';
import ClientProfileSettings from './pages/ClientProfileSettings';
import OnboardingSteps from './pages/OnboardingSteps';
import GamificationIntroduction from './pages/GamificationIntroduction';
import Gamification from './pages/Gamification';

export default function Routes() {
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={LandingPage} />
                <Route path="/about" component={About} />
                <Route path="/bug_report" component={BugReport} />
                <Route path="/register" exact component={Register} />
                <Route path="/register_client" component={ClientRegister} />
                <Route path="/register_freelancer" component={FreelancerRegister} />
                <Route path="/login" component={Login} />
                <Route path="/main" component={Main} />
                <Route path="/new_project" component={NewProject} />
                <Route path="/new_offer/:project_id" component={NewOffer} />
                <Route path="/offers_review" component={OffersReview} />
                <Route path="/ongoing_projects" component={OngoingProjects} />
                <Route path="/project_development" component={ProjectDevelopment} />
                <Route path="/team_settings" component={TeamSettings} />
                <Route path="/create_team" component={CreateTeam} />
                <Route path="/teams" component={Teams} />
                <Route path="/team" component={Team} />
                <Route path="/team_joining_solicitation" component={TeamJoiningSolicitation} />
                <Route path="/joining_solicitations_review" component={JoiningSolicitationsReview} />
                <Route path="/profile/:user_id" component={Profile} />
                <Route path="/team_profile/:team_id" component={TeamProfile} />
                <Route path="/freelancer_profile_settings" component={FreelancerProfileSettings} />
                <Route path="/client_profile_settings" component={ClientProfileSettings} />
                <Route path="/onboarding_steps" component={OnboardingSteps} />
                <Route path="/gamification_introduction" component={GamificationIntroduction} />
                <Route path="/gamification" component={Gamification} />
            </Switch>
        </BrowserRouter>
    );
}