# **PlaNUS**

National University of Singapore CP2106 (Orbital)

Milestone 2


## Contributors

Gwyneth Guo Bai Ling (A0245776N)

Michelle Angela Celeste (A0244123U)


## Proposed Level of Achievement 

Apollo 11




# Table of Content

Team Name

Team Contributors

Level of Achievement

Motivation

Aim

Project Scope

User Stories

Features and Extensions

Development Timeline

User Interfaces

Technical Proof of Concept



* Github
* Web Application
* Video Demonstration

Poster

Features Developed



* Login/Register Page
* Dashboard Page
* To-do List
* Projects
* Settings/Profile
* Sidebar

Important Features Explanations

Testing



* Frontend
* Backend

Software Engineering Practices



* Version Control with Git
    * Branching
    * Github Issues and Milestone
    * Github Projects

Activity Diagram

Tech Stack



* Frontend
* Backend
* Services and API

Project Log



* Milestone 1
* Milestone 2
* Milestone 3




# Motivation

Having to juggle between individual work, group projects, and Co-Curricular Activities, university students often lack the ability to manage their tasks efficiently. Students often miss out on some tasks when they have a myriad of projects and work to do. Thus, we came up with an idea to make a single application to ease the students in planning out their daily schedules as well as managing their group projects. Accordingly, the application is equipped with features, such as To-dos & schedules planner and group projects manager, which makes group project planning faster and simpler for the user.


# Aim

Our goal is to resolve students’ problems on task planning for individual and group works while providing a simple UI that can be easily understood by the user.


# Project Scope



1. User Authentication System
* Create a new account using email and password or Sign in using an existing Google account
* Login
* Reset password (through a link sent to inputted email address)
* Automated login for registered accounts (user is automatically directed to Dashboard page)
2. Dashboard Page
* Display the user’s full name derived from the Google account and the number of unfinished tasks / total number of tasks from the To-do List page
* Display the uncompleted tasks from the To-do List page alongside the current status
* Display the upcoming projects alongside the due dates
* Display monthly schedules in Agenda Calendar view
3. Profile
* Change username, full name, email address, or faculty from the Settings tab
* Change password (for email-registered accounts) from the Settings tab
* Change profile picture from the Settings tab
* Display username (derived from email address) and profile picture (derived from Google account profile picture) in the Sidebar
4. Schedules
* Display schedules in either monthly, weekly, daily, or agenda format (easily switch using the navigation button) in the schedules tab
* Display the schedule details on a Popup
* Add a schedule (name, start date & time, and end date & time)
* Modify/delete an existing schedule
* Toggle the public/private switch to make the schedule viewable publicly or only visible to the user
* Import schedules from NUSMods (extension)
5. To-do List / Tasks
* Display tasks which are labelled into three categories (Not Started, In Progress, and Completed)
* Add a task (name, project, members, and status)
* Modify/delete an existing task (additional inputs: status and drag-able progress bar)
* Sort the tasks (extension)
6. Projects
* Display projects (ongoing and completed projects)
* Add a project (name, group name, members, start date, due date, progress based on the project tasks)
* Modify/delete a selected project
* Display tasks associated with the project (personal and group tasks)
* Display the project’s progress using a circular and linear progress bar 
* Add other user to a project group


# User Stories



1. As a student with many deadlines, exams, and projects, I want to be able to keep track of my schedules and plan my To-do lists. 
2. As a student, I want to be able to check other students’ schedules to instantly arrange meetings (if given permission) without waiting for responses.
3. As a student, I want to get notified of my upcoming events and planned out To-do lists. (extension)
4. As a student, I want to manage my group project deliverables conveniently, such as task appointments, project timelines, and individual progress.
5. As a student, I want the convenience of being able to join group meetings by one click. (extension)
6. As an administrator who wants to value the users’ privacy, I want to give the users an option to set their schedules to private.


# Features and Extensions


## Project Features 

We aim to make an application which can ease university students in planning out their schedules and simply managing their group projects. With regard to this goal, we came up with PlaNUS, an application equipped with multiple features which support the aim mentioned. The users can list down their To-dos and schedules, and receive notifications regarding upcoming events and incomplete tasks. In addition, the users are able to view their schedules in either daily, weekly, or monthly format. The application is also equipped with a project tracker feature which allows the user to easily discuss their group projects with their peers and track the progress of their projects.


# Development Plan


<table>
  <tr>
   <td><strong>Milestone</strong>
   </td>
   <td><strong>Tasks</strong>
   </td>
   <td><strong>Member</strong>
   </td>
   <td><strong>Date</strong>
   </td>
  </tr>
  <tr>
   <td rowspan="4" >1
   </td>
   <td>Create Frontend Mockup using Figma
   </td>
   <td>Michelle & Gwyneth
   </td>
   <td>20-23/5
   </td>
  </tr>
  <tr>
   <td>[Frontend] Login and Signup Page
   </td>
   <td>Michelle
   </td>
   <td>24-29/5
   </td>
  </tr>
  <tr>
   <td>[Backend] Login and Signup Page
   </td>
   <td>Gwyneth
   </td>
   <td>24-30/5
   </td>
  </tr>
  <tr>
   <td>Create a React app and main routes from Login Page to Signup and Dashboard Page
   </td>
   <td>Gwyneth
   </td>
   <td>24-30/5
   </td>
  </tr>
  <tr>
   <td rowspan="13" >2
   </td>
   <td>Create the App Sidebar (profile picture, name, and routes to other pages)
   </td>
   <td>Michelle
   </td>
   <td>2-5/6
   </td>
  </tr>
  <tr>
   <td>[Backend] Create the user profile features on the Sidebar: 
<ul>

<li>Display name related to the registered Google account’s email address

<li>Display the Google account’s profile picture 
</li>
</ul>
   </td>
   <td>Gwyneth
   </td>
   <td>2-5/6
   </td>
  </tr>
  <tr>
   <td>[Frontend] Create the core features of Dashboard Page: 
<ul>

<li>Display today’s unfinished tasks

<li>Display monthly schedules

<li>Display upcoming projects
</li>
</ul>
   </td>
   <td>Michelle
   </td>
   <td>5-9/6
   </td>
  </tr>
  <tr>
   <td>[Backend] Create the core features of Dashboard Page: 
<ul>

<li>Display today’s unfinished tasks

<li>Display monthly schedules

<li>Display upcoming projects
</li>
</ul>
   </td>
   <td>Gwyneth
   </td>
   <td>5-9/6
   </td>
  </tr>
  <tr>
   <td>[Frontend] Create the core features of To-do List Page: 
<ul>

<li>Display tasks categorized as not started, in progress, and completed

<li>Add, modify, and delete a task
</li>
</ul>
   </td>
   <td>Michelle
   </td>
   <td>10-14/6
   </td>
  </tr>
  <tr>
   <td>[Backend] Create the core features of To-do List Page: 
<ul>

<li>Display tasks categorized as not started, in progress, and completed

<li>Add, modify, and delete a task
</li>
</ul>
   </td>
   <td>Gwyneth
   </td>
   <td>10-14/6
   </td>
  </tr>
  <tr>
   <td>[Frontend] Create the core features of Settings Page: 
<ul>

<li>Change user profile (username, full name, email address, faculty, or profile picture) 

<li>Change user password
</li>
</ul>
   </td>
   <td>Michelle
   </td>
   <td>15-16/6
   </td>
  </tr>
  <tr>
   <td>[Backend] Create the core features of Settings Page: 
<ul>

<li>Change user profile (username, full name, email address, faculty, or profile picture) 

<li>Change user password
</li>
</ul>
   </td>
   <td>Gwyneth
   </td>
   <td>15-18/6
   </td>
  </tr>
  <tr>
   <td>[Frontend] Create the core features of Schedules Page: 
<ul>

<li>Display schedules in a monthly, weekly, or daily format

<li>Add, modify, and delete a schedule
</li>
</ul>
   </td>
   <td>Michelle
   </td>
   <td>17-21/6
   </td>
  </tr>
  <tr>
   <td>[Backend] Create the core features of Schedules Page: 
<ul>

<li>Display schedules in a monthly, weekly, or daily format

<li>Add, modify, and delete a schedule
</li>
</ul>
   </td>
   <td>Gwyneth
   </td>
   <td>20-24/6
   </td>
  </tr>
  <tr>
   <td>[Frontend] Create the core features of Projects Page: 
<ul>

<li>Display projects data (name, due date, members) 

<li>Add, modify, and delete a project

<li>Display personal and group projects associated with the project
</li>
</ul>
   </td>
   <td>Michelle
   </td>
   <td>22-25/6
   </td>
  </tr>
  <tr>
   <td>[Frontend] Restyle the Login, Signup, and Reset Password page design
   </td>
   <td>Michelle
   </td>
   <td>26/6
   </td>
  </tr>
  <tr>
   <td>[Backend] Create the core features of Projects Page: 
<ul>

<li>Display projects data (name, due date, members) 

<li>Add, modify, and delete a project

<li>Display personal and group projects associated with the project
</li>
</ul>
   </td>
   <td>Gwyneth
   </td>
   <td>25-27/6
   </td>
  </tr>
  <tr>
   <td rowspan="8" >3
   </td>
   <td>[Frontend] Create the core features of Groups Page: 
<ul>

<li>Send texts through group chats

<li>Invite group members into a group

<li>Accept/reject a group invitation

<li>Send pictures/files to the group chat (extension)
</li>
</ul>
   </td>
   <td>Michelle
   </td>
   <td>28-30/6 & 1-8/7
   </td>
  </tr>
  <tr>
   <td>[Backend] Create the core features of Groups Page: 
<ul>

<li>Send texts through group chats

<li>Invite other users into a group

<li>Accept/reject a group invitation

<li>Send pictures/files to the group chat (extension)
</li>
</ul>
   </td>
   <td>Gwyneth
   </td>
   <td>28-30/6 & 1-8/7
   </td>
  </tr>
  <tr>
   <td>[Frontend] Create the extension features of Projects Page: 
<ul>

<li>View project progress

<li>Allocate tasks to other members
</li>
</ul>
   </td>
   <td>Michelle
   </td>
   <td>9-13/7
   </td>
  </tr>
  <tr>
   <td>[Backend] Create the extension features of Projects Page: 
<ul>

<li>View project progress

<li>Allocate tasks to other members
</li>
</ul>
   </td>
   <td>Gwyneth
   </td>
   <td>9-13/7
   </td>
  </tr>
  <tr>
   <td>[Frontend] Do system testing and final debugging
   </td>
   <td>Michelle
   </td>
   <td>1-25/7
   </td>
  </tr>
  <tr>
   <td>[Backend] Do system testing and final debugging
   </td>
   <td>Gwyneth
   </td>
   <td>1-25/7
   </td>
  </tr>
  <tr>
   <td>[Frontend] Add extension features to each App page
   </td>
   <td>Michelle 
   </td>
   <td>1-25/7
   </td>
  </tr>
  <tr>
   <td>[Backend] Add extension features to each App page
   </td>
   <td>Gwyneth
   </td>
   <td>1-25/7
   </td>
  </tr>
</table>



# Technical Proof of Concept


## Web Application

[https://planusorbital.vercel.app/](https://planusorbital.vercel.app/)


## Video Demonstration

[https://drive.google.com/file/d/1UHAFoOVSTPBCA0bB3AMnFNvpPiHrsGu6/view?usp=sharing](https://drive.google.com/file/d/1UHAFoOVSTPBCA0bB3AMnFNvpPiHrsGu6/view?usp=sharing) 


# Poster

[https://drive.google.com/file/d/16ZncPbgVFktAEayXtKVsno1AyYVwkyNz/view?usp=sharing](https://drive.google.com/file/d/16ZncPbgVFktAEayXtKVsno1AyYVwkyNz/view?usp=sharing)


# Project Log

[https://docs.google.com/spreadsheets/d/12np4xY-ze7SHD2vc0nuemRxKM2ICiCyxTFxT3CG4-IM/edit?usp=sharing](https://docs.google.com/spreadsheets/d/12np4xY-ze7SHD2vc0nuemRxKM2ICiCyxTFxT3CG4-IM/edit?usp=sharing) 


# Features Developed



1. Login/Register Page

    

<p id="gdcalert1" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: inline image link here (to images/image1.png). Store image on your image server and adjust path/filename/extension if necessary. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert2">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>


![alt_text](images/image1.png "image_tooltip")



    A user can log in with either a (i) Google Account, or (ii) Email Address and Password. If the users forget their password, they can click on the 'Forgot your password?' link and they will be directed to the Reset Password page. 


    On the Reset Password page, the users will be asked to input their email so that we can send the login link. Upon clicking the link, the users can make a new password for their account. 


    

<p id="gdcalert2" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: inline image link here (to images/image2.png). Store image on your image server and adjust path/filename/extension if necessary. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert3">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>


![alt_text](images/image2.png "image_tooltip")



    A user can also Sign Up with username, full name, email address, faculty, and password. A user must fill in the required fields or else an error box will appear.

2. Dashboard Page

    

<p id="gdcalert3" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: inline image link here (to images/image3.png). Store image on your image server and adjust path/filename/extension if necessary. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert4">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>


![alt_text](images/image3.png "image_tooltip")



    Dashboard displays the user’s Full Name that is obtained from the database, Uncompleted Tasks (alongside the task status), Upcoming Projects (alongside the prpject due date), and Monthly Schedule (React-big-calendar Agenda view)

3. To-do List

    

<p id="gdcalert4" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: inline image link here (to images/image4.png). Store image on your image server and adjust path/filename/extension if necessary. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert5">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>


![alt_text](images/image4.png "image_tooltip")



    

<p id="gdcalert5" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: inline image link here (to images/image5.png). Store image on your image server and adjust path/filename/extension if necessary. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert6">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>


![alt_text](images/image5.png "image_tooltip")


<p id="gdcalert6" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: inline image link here (to images/image6.png). Store image on your image server and adjust path/filename/extension if necessary. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert7">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>


![alt_text](images/image6.png "image_tooltip")


<p id="gdcalert7" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: inline image link here (to images/image7.png). Store image on your image server and adjust path/filename/extension if necessary. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert8">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>


![alt_text](images/image7.png "image_tooltip")



    The To-do List page contains three sections: Not Started, In Progress, and Completed to display the tasks based on the respective status. A user can add a task to each of the statuses (using the 'Add Task' button below each status), modify the task (by clicking on the edit icon), and also delete the task. The project and members fields on tasks are connected to existing projects and the members involved in the project respectively.  

4. Settings

    

<p id="gdcalert8" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: inline image link here (to images/image8.png). Store image on your image server and adjust path/filename/extension if necessary. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert9">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>


![alt_text](images/image8.png "image_tooltip")



    

<p id="gdcalert9" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: inline image link here (to images/image9.png). Store image on your image server and adjust path/filename/extension if necessary. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert10">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>


![alt_text](images/image9.png "image_tooltip")


<p id="gdcalert10" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: inline image link here (to images/image10.png). Store image on your image server and adjust path/filename/extension if necessary. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert11">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>


![alt_text](images/image10.png "image_tooltip")



    In the Settings Page, users are able to change their profile details, such as Username, Email Address, Full Name, and Faculty by directly changing the inputs' value and then clicking on the 'Save Changes' button. They are also able to change their password using the 'Change Password' button. To change the profile picture, the users can click on the upload icon to browse files for the image and then click on the 'Upload' button to confirm. 

5. Projects

    

<p id="gdcalert11" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: inline image link here (to images/image11.png). Store image on your image server and adjust path/filename/extension if necessary. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert12">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>


![alt_text](images/image11.png "image_tooltip")



    

<p id="gdcalert12" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: inline image link here (to images/image12.png). Store image on your image server and adjust path/filename/extension if necessary. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert13">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>


![alt_text](images/image12.png "image_tooltip")


<p id="gdcalert13" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: inline image link here (to images/image13.png). Store image on your image server and adjust path/filename/extension if necessary. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert14">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>


![alt_text](images/image13.png "image_tooltip")


<p id="gdcalert14" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: inline image link here (to images/image14.png). Store image on your image server and adjust path/filename/extension if necessary. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert15">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>


![alt_text](images/image14.png "image_tooltip")


<p id="gdcalert15" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: inline image link here (to images/image15.png). Store image on your image server and adjust path/filename/extension if necessary. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert16">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>


![alt_text](images/image15.png "image_tooltip")



    The Projects page allows the users to view all their ongoing and completed projects alongside the details about each project. A user is also able to add a project using the ‘Add Project’ button. They are able to view the details of a project upon clicking the right arrow button on each project paper. They can also modify and delete a project by clicking on the edit and delete icons on the Details Popup. The user can add other users into a project group by inputting others’ email address and clicking the ‘Add’ button. The users can also view and update their project progress. Additionally, they can view their personal and group tasks which are associated with a project.

6. Schedules

    

<p id="gdcalert16" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: inline image link here (to images/image16.png). Store image on your image server and adjust path/filename/extension if necessary. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert17">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>


![alt_text](images/image16.png "image_tooltip")



    

<p id="gdcalert17" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: inline image link here (to images/image17.png). Store image on your image server and adjust path/filename/extension if necessary. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert18">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>


![alt_text](images/image17.png "image_tooltip")



    

<p id="gdcalert18" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: inline image link here (to images/image18.png). Store image on your image server and adjust path/filename/extension if necessary. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert19">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>


![alt_text](images/image18.png "image_tooltip")


<p id="gdcalert19" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: inline image link here (to images/image19.png). Store image on your image server and adjust path/filename/extension if necessary. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert20">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>


![alt_text](images/image19.png "image_tooltip")



    

<p id="gdcalert20" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: inline image link here (to images/image20.png). Store image on your image server and adjust path/filename/extension if necessary. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert21">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>


![alt_text](images/image20.png "image_tooltip")


<p id="gdcalert21" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: inline image link here (to images/image21.png). Store image on your image server and adjust path/filename/extension if necessary. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert22">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>


![alt_text](images/image21.png "image_tooltip")



    On the Schedules page, the users can view their schedules in various formats, such as monthly, weekly, daily, and agenda formats. They can add a schedule using the add button on the bottom right of the page. They can view the schedule details by clicking on the desired event. They can also modify or delete a schedule by clicking on the buttons on the Details Popup. Lastly, they can switch the created schedule to public or private, to make the schedules available to the public or kept in private. However, the implementation of the schedule’s privacy is still in progress.  

7. Sidebar

    

<p id="gdcalert22" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: inline image link here (to images/image22.png). Store image on your image server and adjust path/filename/extension if necessary. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert23">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>


![alt_text](images/image22.png "image_tooltip")



    Using the Sidebar, the users can navigate to many different pages, including Dashboard, Schedules, To-do List, Projects, and Settings. Also, the users can log out of their account by clicking the Sidebar Log Out icon. 

8. User Authentication Logic


# Software Engineering Practices


## Version Control with Git



<p id="gdcalert23" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: inline image link here (to images/image23.png). Store image on your image server and adjust path/filename/extension if necessary. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert24">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>


![alt_text](images/image23.png "image_tooltip")



### Branching



<p id="gdcalert24" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: inline image link here (to images/image24.png). Store image on your image server and adjust path/filename/extension if necessary. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert25">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>


![alt_text](images/image24.png "image_tooltip")


We properly updated our code by making two more branches other than ‘main’ that are branches from the ‘main’ branch. Each of us pushes our local workspace to our separate remote branch (‘michelle’ / ‘gwyneth’) and gives commit messages for each push. We also made several feature branches, such as ‘TodoList’, ‘Settings’, ‘Projects’, ‘Dashboard’, and ‘Schedules’ to commit and push changes made on the associated features. Then, we merge our committed changes to the main branch by making a merge pull request. In some cases, we also used the command prompt and Github compare and merge function to resolve some conflicts that we came across on branching. The picture below is the network graph for our branching.



<p id="gdcalert25" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: inline image link here (to images/image25.png). Store image on your image server and adjust path/filename/extension if necessary. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert26">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>


![alt_text](images/image25.png "image_tooltip")



### Issues and Milestone



<p id="gdcalert26" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: inline image link here (to images/image26.png). Store image on your image server and adjust path/filename/extension if necessary. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert27">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>


![alt_text](images/image26.png "image_tooltip")




<p id="gdcalert27" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: inline image link here (to images/image27.png). Store image on your image server and adjust path/filename/extension if necessary. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert28">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>


![alt_text](images/image27.png "image_tooltip")




<p id="gdcalert28" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: inline image link here (to images/image28.png). Store image on your image server and adjust path/filename/extension if necessary. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert29">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>


![alt_text](images/image28.png "image_tooltip")


We created some milestones based on the assigned due dates and some issues according to the tasks that we would like to do next throughout the milestones; however, we used this feature in Github a little late (after making the login and sign up feature). We added the issues after finishing some of the main features in the authentication system and labelled them with the related milestones. We also used the assign, tag, project, and milestone labels when creating issues.


### Github Projects



<p id="gdcalert29" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: inline image link here (to images/image29.png). Store image on your image server and adjust path/filename/extension if necessary. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert30">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>


![alt_text](images/image29.png "image_tooltip")




<p id="gdcalert30" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: inline image link here (to images/image30.png). Store image on your image server and adjust path/filename/extension if necessary. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert31">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>


![alt_text](images/image30.png "image_tooltip")


To resolve the comments for Milestone 2, we finally used the Github Projects feature as we thought that it would be more efficient for us to link issues and pull requests, and also categorize issues into several categories.


# Diagrams


## Activity Diagram



<p id="gdcalert31" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: inline image link here (to images/image31.png). Store image on your image server and adjust path/filename/extension if necessary. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert32">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>


![alt_text](images/image31.png "image_tooltip")



# Design Principles and Patterns

We structured our files into several folders, such as source, components, hooks, etc. We mainly worked inside the source folder, as we divided our files according to each page that we made. For example: Dashboard, Settings, Schedule, and others. This will also make it easy to resolve conflicts when merging pull requests in Github, as we know which files should be the newest version according to the branch.


# Testing


## Frontend Testing



<p id="gdcalert32" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: inline image link here (to images/image32.png). Store image on your image server and adjust path/filename/extension if necessary. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert33">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>


![alt_text](images/image32.png "image_tooltip")


We utilized React Testing Library and Jest to test our Front End. We have tested 6 test suites including 8 of our Web App pages. of our Web App with 16 automated test cases. The tests that we have done are unit testing, to make sure every single element can be rendered without any side effects, and integration testing, to make sure that the combination of various components that we used in a feature can work well. 


## Backend Testing



<p id="gdcalert33" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: inline image link here (to images/image33.png). Store image on your image server and adjust path/filename/extension if necessary. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert34">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>


![alt_text](images/image33.png "image_tooltip")


GET Request for ‘profiles’ database



<p id="gdcalert34" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: inline image link here (to images/image34.png). Store image on your image server and adjust path/filename/extension if necessary. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert35">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>


![alt_text](images/image34.png "image_tooltip")


GET Request for ‘profile/[gwynethguo@gmail.com](mailto:gwynethguo@gmail.com)’ database



<p id="gdcalert35" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: inline image link here (to images/image35.png). Store image on your image server and adjust path/filename/extension if necessary. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert36">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>


![alt_text](images/image35.png "image_tooltip")


POST Request for ‘profile”



<p id="gdcalert36" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: inline image link here (to images/image36.png). Store image on your image server and adjust path/filename/extension if necessary. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert37">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>


![alt_text](images/image36.png "image_tooltip")


DELETE Request for ‘profile/[gwynethguo@gmail.com](mailto:gwynethguo@gmail.com)’



<p id="gdcalert37" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: inline image link here (to images/image37.png). Store image on your image server and adjust path/filename/extension if necessary. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert38">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>


![alt_text](images/image37.png "image_tooltip")


GET Request for ‘projects’



<p id="gdcalert38" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: inline image link here (to images/image38.png). Store image on your image server and adjust path/filename/extension if necessary. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert39">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>


![alt_text](images/image38.png "image_tooltip")


GET Request for ‘tasks’



<p id="gdcalert39" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: inline image link here (to images/image39.png). Store image on your image server and adjust path/filename/extension if necessary. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert40">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>


![alt_text](images/image39.png "image_tooltip")


GET Request for ‘schedules’

It can be seen that the backend testing using POSTMAN results in 200 OK status which indicates that the backend works fine. 


# Tech Stack


## Frontend

React.js

Essential dependencies:



* Material UI
* React Icons

For further information for dependencies, visit [https://github.com/michelleangelac/planusorbital/network/dependencies](https://github.com/michelleangelac/planusorbital/network/dependencies) 


## Backend (Database, Authentication, and Storage)

Firestore Database



<p id="gdcalert40" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: inline image link here (to images/image40.png). Store image on your image server and adjust path/filename/extension if necessary. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert41">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>


![alt_text](images/image40.png "image_tooltip")


We used Firestore Database to store profile information, project details, schedules, and also tasks. The fields are mainly strings except for members. 

Firebase Storage



<p id="gdcalert41" ><span style="color: red; font-weight: bold">>>>>>  gd2md-html alert: inline image link here (to images/image41.png). Store image on your image server and adjust path/filename/extension if necessary. </span><br>(<a href="#">Back to top</a>)(<a href="#gdcalert42">Next alert</a>)<br><span style="color: red; font-weight: bold">>>>>> </span></p>


![alt_text](images/image41.png "image_tooltip")


We also used Firebase Storage for the browse files and upload Profile Picture in the Settings page, and also created the link for the image file through firebase storage.


## App Deployment

Vercel

We automatically deploy our app using vercel everytime we push a commit to our remote repository. Vercel then checks if the branch that will be merged to main can be deployed or not. Then, we usually resolve conflicts (if any) and finally merge pull request if vercel states that the deployment is successful.
