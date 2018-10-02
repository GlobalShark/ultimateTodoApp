
<?php
session_start();
if($_SESSION['loggedIn'] == true)
{

}
else{
  header('Location: login.php');
}


 ?>

    <link href="icon_fonts_assets/themefy/themify-icons.css" rel="stylesheet">
    <link href="icon_fonts_assets/picons-thin/style.css" rel="stylesheet">
<html>

   <!--------------------
        START - Mobile Menu
        -------------------->


        <div class="menu-mobile menu-activated-on-click color-scheme-dark">
          <div class="mm-logo-buttons-w">
            <a class="mm-logo" href="index.html"><img src="img/logo.png"><span>Clean Admin</span></a>
            <div class="mm-buttons">
              <div class="content-panel-open">
                <div class="os-icon os-icon-grid-circles"></div>
              </div>
              <div class="mobile-menu-trigger">
                <div class="os-icon os-icon-hamburger-menu-1"></div>
              </div>
            </div>
          </div>
          <div class="menu-and-user">
            <div class="logged-user-w">
              <div class="avatar-w">
                <img alt="" src="img/avatar1.jpg">
              </div>
              <div class="logged-user-info-w">
                <div class="logged-user-name">
                  Maria Gomez
                </div>
                <div class="logged-user-role">
                  Administrator
                </div>
              </div>
            </div>
            <!--------------------
            START - Mobile Menu List
            -------------------->
            <ul class="main-menu">

              <li class="has-sub-menu">
                <a href="index.html">
                  <div class="icon-w">
                    <div class="icon-user-follow"></div>
                  </div>
                  <span>Entry</span></a>
                <ul class="sub-menu">
                  <li>
                    <a href="addstudent.php">Add Student</a>
                  </li>
                  <li>
                    <a href="apps_projects.html">Add Staff</a>
                  </li>
                </ul>
              </li>

                <li class="has-sub-menu">
                <a href="index.html">
                  <div class="icon-w">
                    <div class="icon-user-unfollow"></div>
                  </div>
                  <span>Remove</span></a>
                <ul class="sub-menu">
                  <li>
                    <a href="index.html">Edit Student</a>
                  </li>
                  <li>
                    <a href="apps_projects.html">Edit Teacher</a>
                  </li>
                </ul>
              </li>

              <li class="has-sub-menu">
                <a href="#">
                  <div class="icon-w">
                    <div class="os-icon os-icon-user-male-circle"></div>
                  </div>
                  <span>Details</span></a>
                <ul class="sub-menu">
                  <li>
                    <a href="Studentsdetail.php">Students Detail</a>
                  </li>
                  <li>
                    <a href="users_profile_small.html">Staff Detail</a>
                  </li>
                </ul>
              </li>


              <li class="has-sub-menu">
                <a href="#">
                  <div class="icon-w">
                    <div class="icon-clock"></div>
                  </div>
                  <span>Time Table</span></a>
                <ul class="sub-menu">
                  <li>
                    <a href="table.php">Semester 1</a>
                  </li>
                  <li>
                    <a href="rentals_index_grid.html">Semester 2</a>
                  </li>
                  <li>
                    <a href="misc_charts.html">Semester 3</a>
                  </li>
                  <li>
                    <a href="front_home.html">Semester 4</a>
                  </li>
                  <li>
                    <a href="auth_login.html">Semester 5</a>
                  </li>
                  <li>
                    <a href="auth_register.html">Semester 6</a>
                  </li>
                  </ul>




              <li class="has-sub-menu">
                <a href="index.html">
                  <div class="icon-w">
                    <div class="icon-layers"></div>
                  </div>
                  <span>Time Table List</span></a>
                <ul class="sub-menu">
                  <li>
                    <a href="index.html">Odd List</a>
                  </li>
                  <li>
                    <a href="apps_projects.html">Even List</a>
                  </li>
                </ul>
              </li>



                  
              <li class="has-sub-menu">
                <a href="#">
                  <div class="icon-w">
                    <div class="os-icon os-icon-tasks-checked"></div>
                  </div>
                  <span>Attendance</span></a>
                <ul class="sub-menu">
                  <li>
                    <a href="misc_invoice.html">Semester 1</a>
                  </li>
                  <li>
                    <a href="rentals_index_grid.html">Semester 2</a>
                  </li>
                  <li>
                    <a href="misc_charts.html">Semester 3</a>
                  </li>
                  <li>
                    <a href="front_home.html">Semester 4</a>
                  </li>
                  <li>
                    <a href="auth_login.html">Semester 5</a>
                  </li>
                  <li>
                    <a href="auth_register.html">Semester 6</a>
                  </li>
                </ul>

              <li class="has-sub-menu">
                <a href="#">
                  <div class="icon-w">
                    <div class="os-icon os-icon-pencil-12"></div>
                  </div>
                  <span>Syllabus</span></a>
                <ul class="sub-menu">
                  <li>
                    <a href="syllabus0101.php">Semester 1</a>
                  </li>
                  <li>
                    <a href="rentals_index_grid.html">Semester 2</a>
                  </li>
                  <li>
                    <a href="misc_charts.html">Semester 3</a>
                  </li>
                  <li>
                    <a href="front_home.html">Semester 4</a>
                  </li>
                  <li>
                    <a href="auth_login.html">Semester 5</a>
                  </li>
                  <li>
                    <a href="auth_register.html">Semester 6</a>
                  </li>
                </ul>


              <li class="has-sub-menu">
                <a href="#">
                  <div class="icon-w">
                    <div class="icon-graduation"></div>
                  </div>
                  <span>Result</span></a>
                <ul class="sub-menu">
                  <li>
                    <a href="misc_invoice.html">Semester 1</a>
                  </li>
                  <li>
                    <a href="rentals_index_grid.html">Semester 2</a>
                  </li>
                  <li>
                    <a href="misc_charts.html">Semester 3</a>
                  </li>
                  <li>
                    <a href="front_home.html">Semester 4</a>
                  </li>
                  <li>
                    <a href="auth_login.html">Semester 5</a>
                  </li>
                  <li>
                    <a href="auth_register.html">Semester 6</a>
                  </li>
                </ul>


              <li class="has-sub-menu">
                <a href="#">
                  <div class="icon-w">
                    <div class="os-icon os-icon-robot-1"></div>
                  </div>
                  <span>Icons</span></a>
                <ul class="sub-menu">
                  <li>
                    <a href="icon_fonts_simple_line_icons.html">Simple Line Icons</a>
                  </li>
                  <li>
                    <a href="icon_fonts_themefy.html">Themefy Icons</a>
                  </li>
                  <li>
                    <a href="icon_fonts_picons_thin.html">Picons Thin</a>
                  </li>
                  <li>
                    <a href="icon_fonts_dripicons.html">Dripicons</a>
                  </li>
                  <li>
                    <a href="icon_fonts_eightyshades.html">Eightyshades</a>
                  </li>
                  <li>
                    <a href="icon_fonts_entypo.html">Entypo</a>
                  </li>
                  <li>
                    <a href="icon_fonts_font_awesome.html">Font Awesome</a>
                  </li>
                  <li>
                    <a href="icon_fonts_foundation_icon_font.html">Foundation Icon Font</a>
                  </li>
                  <li>
                    <a href="icon_fonts_metrize_icons.html">Metrize Icons</a>
                  </li>
                  <li>
                    <a href="icon_fonts_picons_social.html">Picons Social</a>
                  </li>
                  <li>
                    <a href="icon_fonts_batch_icons.html">Batch Icons</a>
                  </li>
                  <li>
                    <a href="icon_fonts_dashicons.html">Dashicons</a>
                  </li>
                  <li>
                    <a href="icon_fonts_typicons.html">Typicons</a>
                  </li>
                  <li>
                    <a href="icon_fonts_weather_icons.html">Weather Icons</a>
                  </li>
                  <li>
                    <a href="icon_fonts_light_admin.html">Light Admin</a>
                  </li>
                </ul>
              </li>
            </ul>
            <!--------------------
            END - Mobile Menu List
            -------------------->
            <div class="mobile-menu-magic">
              <h4>
                Light Admin
              </h4>
              <p>
                Clean Bootstrap 4 Template
              </p>
              <div class="btn-w">
                <a class="btn btn-white btn-rounded" href="https://themeforest.net/item/light-admin-clean-bootstrap-dashboard-html-template/19760124?ref=Osetin" target="_blank">Purchase Now</a>
              </div>
            </div>
          </div>
        </div>



        <!--------------------
        END - Mobile Menu
        -------------------->




        <!--------------------
        START - Menu side compact 
        -------------------->



        <div class="desktop-menu menu-side-compact-w menu-activated-on-hover color-scheme-dark">
          <div class="logo-w">
            <a class="logo" href="index.html"><img src="img/logo.png"></a>
          </div>
          <div class="menu-and-user">
            <!--
            <div class="logged-user-w">
              <div class="logged-user-i">
                <div class="avatar-w">
                  <img alt="" src="img/avatar1.jpg">
                </div>
                <div class="logged-user-menu">
                  <div class="logged-user-avatar-info">
                    <div class="avatar-w">
                      <img alt="" src="img/avatar1.jpg">
                    </div>
                    <div class="logged-user-info-w">
                      <div class="logged-user-name">
                        Maria Gomez
                      </div>
                      <div class="logged-user-role">
                        Administrator
                      </div>
                    </div>
                  </div>
                  <div class="bg-icon">
                    <i class="os-icon os-icon-wallet-loaded"></i>
                  </div>
                  <ul>
                    <li>
                      <a href="apps_email.html"><i class="os-icon os-icon-mail-01"></i><span>Incoming Mail</span></a>
                    </li>
                    <li>
                      <a href="users_profile_big.html"><i class="os-icon os-icon-user-male-circle2"></i><span>Profile Details</span></a>
                    </li>
                    <li>
                      <a href="users_profile_small.html"><i class="os-icon os-icon-coins-4"></i><span>Billing Details</span></a>
                    </li>
                    <li>
                      <a href="#"><i class="os-icon os-icon-others-43"></i><span>Notifications</span></a>
                    </li>
                    <li>
                      <a href="#"><i class="os-icon os-icon-signs-11"></i><span>Logout</span></a>
                    </li>
                  </ul>
                </div>
              </div>
            </div> -->
            <ul class="main-menu">
              <li class="has-sub-menu">
                <a href="index.html">
                  <div class="icon-w">
                    <i class="icon-home"></i>
                  </div>
                </a>
                <div class="sub-menu-w">
                  <div class="sub-menu-title">
                    Home
                  </div>
                  <div class="sub-menu-icon">
                    <i class="icon-home"></i>
                  </div>
                  <div class="sub-menu-i">
                    <ul class="sub-menu">
                      <li>
                        <a href="my-profile.php?home=My Profile">My Profile</a>
                      </li>
                      <li>
                        <a href="help.php?home=Help">Help</a>
                      </li>
                      <li>
                        <a href="about.php?home=About">About</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </li>

             <?php include( "classmenu.php" ); ?>

              <!--
               <li class="has-sub-menu">
                <a href="#">
                  <div class="icon-w">
                    <i class="icon-shield"></i>
                  </div>
                </a>
                <div class="sub-menu-w">
                  <div class="sub-menu-title">
                    Fields
                  </div>
                  <div class="sub-menu-icon">
                    <i class="icon-shield"></i>
                  </div>
                  <div class="sub-menu-i">
                    <ul class="sub-menu">
                      <li>
                        <a href="#">Add New Field</a>
                      </li>
                      <li>
                        <a href="#">Delete Field</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </li> -->


               <li class="has-sub-menu">
                <a href="#">
                  <div class="icon-w">
                    <i class="picons-thin-icon-thin-0006_book_writing_reading_read_manual"></i>
                  </div>
                </a>
                <div class="sub-menu-w">
                  <div class="sub-menu-title">
                    Subject
                  </div>
                  <div class="sub-menu-icon">
                    <i class="picons-thin-icon-thin-0006_book_writing_reading_read_manual"></i>
                  </div>
                  <div class="sub-menu-i">
                    <ul class="sub-menu"><li>
                        <a href="create-subject-panel.php?subject=Create Subject">Create Subject</a>
                      </li>
                      <li>
                        <a href="edit-subject-panel.php?subject=Manage Subject">Manage Subjects</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </li>

              <li class="has-sub-menu">
                <a href="#">
                  <div class="icon-w">
                    <i class="picons-thin-icon-thin-0426_money_payment_dollars_coins_cash"></i>
                  </div>
                </a>
                <div class="sub-menu-w">
                  <div class="sub-menu-title">
                    Manage Fee
                  </div>
                  <div class="sub-menu-icon">
                    <i class="picons-thin-icon-thin-0426_money_payment_dollars_coins_cash"></i>
                  </div>
                  <div class="sub-menu-i">
                    <ul class="sub-menu">
                      <?php include('fee-manage-menu.php') ?>

              <li class="has-sub-menu">
                <a href="index.html">
                  <div class="icon-w">
                    <i class="icon-user-follow"></i>
                  </div>
                </a>
                <div class="sub-menu-w">
                  <div class="sub-menu-title">
                    Student Entry
                  </div>
                  <div class="sub-menu-icon">
                    <i class="icon-user-follow"></i>
                  </div>
                  <div class="sub-menu-i">
                    <ul class="sub-menu">
                      <?php include('student-management-menu.php') ?>

              <li class="has-sub-menu">
                <a href="index.html">
                  <div class="icon-w">
                    <i class="picons-thin-icon-thin-0710_business_tie_user_profile_avatar_man_male"></i>
                  </div>
                </a>
                <div class="sub-menu-w">
                  <div class="sub-menu-title">
                    Staff
                  </div>
                  <div class="sub-menu-icon">
                    <i class="picons-thin-icon-thin-0710_business_tie_user_profile_avatar_man_male"></i>
                  </div>
                  <div class="sub-menu-i">
                    <ul class="sub-menu">
                      <li>
                        <a href="form.php?form=Student Addmission Form">Student Addmission Form</a>
                      </li>
                      <li>
                        <a href="addstudent.php?form=Student Entry Form">Student Entry</a>
                      </li>
                      <li>
                        <a href="addstudent.php?Manage Student Form">Manage Student From</a>
                      </li>
                    </ul>
                    <ul class="sub-menu">
                      <li>
                        <a href="add-teacher.php">Add Staff</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </li>

               <li class="has-sub-menu">
                <a href="#">
                  <div class="icon-w">
                    <i class="os-icon os-icon-user-male-circle"></i>
                  </div>
                </a>
                <div class="sub-menu-w">
                  <div class="sub-menu-title">
                    Manage
                  </div>
                  <div class="sub-menu-icon">
                    <i class="os-icon os-icon-user-male-circle"></i>
                  </div>
                  <div class="sub-menu-i">
                    <ul class="sub-menu">
                      <li>
                        <a href="Studentsdetail.php">Manage Student</a>
                      </li>
                      <li>
                        <a href="add-staff.php">Manage Staff</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </li>
               <li class="has-sub-menu">
                <a href="#">
                  <div class="icon-w">
                    <i class="icon-calculator"></i>
                  </div>
                </a>
                <div class="sub-menu-w">
                  <div class="sub-menu-title">
                    Mark Sheet
                  </div>
                  <div class="sub-menu-icon">
                    <i class="icon-calculator"></i>
                  </div>
                  <div class="sub-menu-i">
                    <ul class="sub-menu">
                      <li>
                        <a href="marks-distribution.php?marks=Marks Distribution">Marks Distribution</a>
                      </li>
                      <li>
                        <a href="marks-all.php?marks=All Result">Student MarkSheet</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </li>
              <li class="has-sub-menu">
                <a href="#">
                  <div class="icon-w">
                    <i class="icon-clock"></i>
                  </div>
                </a>
                <div class="sub-menu-w">
                  <div class="sub-menu-title">
                    Time Table
                  </div>
                  <div class="sub-menu-icon">
                    <i class="icon-clock"></i>
                  </div>
                  <div class="sub-menu-i">
                    <ul class="sub-menu">
                      <?php include('timetablemenu.php') ?>



            <!--
              <li class="has-sub-menu">
                <a href="index.html">
                  <div class="icon-w">
                    <i class="icon-layers"></i>
                  </div>
                </a>
                <div class="sub-menu-w">
                  <div class="sub-menu-title">
                    Time Table List
                  </div>
                  <div class="sub-menu-icon">
                    <i class="icon-layers"></i>
                  </div>
                  <div class="sub-menu-i">
                    <ul class="sub-menu">
                      <li>
                        <a href="index.html">Odd List</a>
                      </li>
                      <li>
                        <a href="apps_projects.html">Even List</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </li>
              -->

              <li class="has-sub-menu">
                <a href="#">
                  <div class="icon-w">
                    <i class="icon-calendar"></i>
                  </div>
                </a>
                <div class="sub-menu-w">
                  <div class="sub-menu-title">
                    Event Calendar
                  </div>
                  <div class="sub-menu-icon">
                    <i class="icon-calendar"></i>
                  </div>
                  <div class="sub-menu-i">
                    <ul class="sub-menu">
                      <li>
                    <a href="#">Semester 1</a>
                  </li>
                  <li>
                    <a href="#">Semester 2</a>
                  </li>
                  <li>
                    <a href="#">Semester 3</a>
                  </li>
                      </ul><ul class="sub-menu">
                      <li>
                    <a href="#">Semester 4</a>
                  </li>
                  <li>
                    <a href="#">Semester 5</a>
                  </li>
                  <li>
                    <a href="#">Semester 6</a>
                  </li>
                    </ul>
                  </div>
                </div>
              </li>

              <li class="has-sub-menu">
                <a href="#">
                  <div class="icon-w">
                    <i class="os-icon os-icon-tasks-checked"></i>
                  </div>
                </a>
                <div class="sub-menu-w">
                  <div class="sub-menu-title">
                    Attendance
                  </div>
                  <div class="sub-menu-icon">
                    <i class="os-icon os-icon-tasks-checked"></i>
                  </div>
                  <div class="sub-menu-i">
                    <ul class="sub-menu">
                      <li>
                    <a href="#">Semester 1</a>
                  </li>
                  <li>
                    <a href="#">Semester 2</a>
                  </li>
                  <li>
                    <a href="#">Semester 3</a>
                  </li>
                      </ul><ul class="sub-menu">
                      <li>
                    <a href="#">Semester 4</a>
                  </li>
                  <li>
                    <a href="#">Semester 5</a>
                  </li>
                  <li>
                    <a href="#">Semester 6</a>
                  </li>
                    </ul>
                  </div>
                </div>
              </li>


              <li class="has-sub-menu">
                <a href="#">
                  <div class="icon-w">
                    <i class="os-icon os-icon-pencil-12"></i>
                  </div>
                </a>
                <div class="sub-menu-w">
                  <div class="sub-menu-title">
                    Syllabus
                  </div>
                  <div class="sub-menu-icon">
                    <i class="os-icon os-icon-pencil-12"></i>
                  </div>
                  <div class="sub-menu-i">
                    <ul class="sub-menu">
                      <li>
                    <a href="syllabus0101.php">Semester 1</a>
                  </li>
                  <li>
                    <a href="syllabus0101.php">Semester 2</a>
                  </li>
                  <li>
                    <a href="syllabus0101.php">Semester 3</a>
                  </li>
                      </ul><ul class="sub-menu">
                      <li>
                    <a href="syllabus0101.php">Semester 4</a>
                  </li>
                  <li>
                    <a href="syllabus0101.php">Semester 5</a>
                  </li>
                  <li>
                    <a href="syllabus0101.php">Semester 6</a>
                  </li>
                    </ul>
                  </div>
                </div>
              </li>

              <li class="has-sub-menu">
                <a href="#">
                  <div class="icon-w">
                    <i class="icon-drawer"></i>
                  </div>
                </a>
                <div class="sub-menu-w">
                  <div class="sub-menu-title">
                    Notes
                  </div>
                  <div class="sub-menu-icon">
                    <i class="icon-drawer"></i>
                  </div>
                  <div class="sub-menu-i">
                    <ul class="sub-menu">
                      <li>
                    <a href="syllabus0101.php">Semester 1</a>
                  </li>
                  <li>
                    <a href="syllabus0101.php">Semester 2</a>
                  </li>
                  <li>
                    <a href="syllabus0101.php">Semester 3</a>
                  </li>
                      </ul><ul class="sub-menu">
                      <li>
                    <a href="syllabus0101.php">Semester 4</a>
                  </li>
                  <li>
                    <a href="syllabus0101.php">Semester 5</a>
                  </li>
                  <li>
                    <a href="syllabus0101.php">Semester 6</a>
                  </li>
                    </ul>
                  </div>
                </div>
              </li>
              <li class="has-sub-menu">
                <a href="#">
                  <div class="icon-w">
                    <i class="ti-id-badge"></i>
                  </div>
                </a>
                <div class="sub-menu-w">
                  <div class="sub-menu-title">
                    Card
                  </div>
                  <div class="sub-menu-icon">
                    <i class="ti-id-badge"></i>
                  </div>
                  <div class="sub-menu-i">
                    <ul class="sub-menu">
                      <li>
                    <a href="#">Stdent Id Card</a>
                  </li>
                  <li>
                    <a href="#">Liberary Card</a>
                  </li>
                  <li>
                    <a href="#">Create Other Card</a>
                  </li>
                      </ul>
                      <!--
                      <ul class="sub-menu">
                      <li>
                    <a href="#">Semester 4</a>
                  </li>
                  <li>
                    <a href="#">Semester 5</a>
                  </li>
                  <li>
                    <a href="#">Semester 6</a>
                  </li>
                    </ul> -->
                  </div>
                </div>
              </li>

              


              <li class="has-sub-menu">
                <a href="#">
                  <div class="icon-w">
                    <i class="icon-chart"></i>
                  </div>
                </a>
                <div class="sub-menu-w">
                  <div class="sub-menu-title">
                    Status
                  </div>
                  <div class="sub-menu-icon">
                    <i class="icon-chart"></i>
                  </div>
                  <div class="sub-menu-i">
                    <ul class="sub-menu">
                      <li>
                    <a href="#">Semester 1</a>
                  </li>
                  <li>
                    <a href="#">Semester 2</a>
                  </li>
                  <li>
                    <a href="#">Semester 3</a>
                  </li>
                      </ul><ul class="sub-menu">
                      <li>
                    <a href="#">Semester 4</a>
                  </li>
                  <li>
                    <a href="#">Semester 5</a>
                  </li>
                  <li>
                    <a href="#">Semester 6</a>
                  </li>
                    </ul>
                  </div>
                </div>
              </li>


              <li class="has-sub-menu">
                <a href="#">
                  <div class="icon-w">
                    <i class="os-icon os-icon-robot-1"></i>
                  </div>
                </a>
                <div class="sub-menu-w">
                  <div class="sub-menu-title">
                    Icons
                  </div>
                  <div class="sub-menu-icon">
                    <i class="os-icon os-icon-robot-1"></i>
                  </div>
                  <div class="sub-menu-i">
                    <ul class="sub-menu">
                      <li>
                        <a href="icon_fonts_simple_line_icons.html">Simple Line Icons</a>
                      </li>
                      <li>
                        <a href="icon_fonts_themefy.html">Themefy Icons</a>
                      </li>
                      <li>
                        <a href="icon_fonts_picons_thin.html">Picons Thin</a>
                      </li>
                      <li>
                        <a href="icon_fonts_dripicons.html">Dripicons</a>
                      </li>
                      <li>
                        <a href="icon_fonts_eightyshades.html">Eightyshades</a>
                      </li>
                      </ul><ul class="sub-menu">
                      <li>
                        <a href="icon_fonts_entypo.html">Entypo</a>
                      </li>
                      <li>
                        <a href="icon_fonts_font_awesome.html">Font Awesome</a>
                      </li>
                      <li>
                        <a href="icon_fonts_foundation_icon_font.html">Foundation Icon Font</a>
                      </li>
                      <li>
                        <a href="icon_fonts_metrize_icons.html">Metrize Icons</a>
                      </li>
                      <li>
                        <a href="icon_fonts_picons_social.html">Picons Social</a>
                      </li>
                      </ul><ul class="sub-menu">
                      <li>
                        <a href="icon_fonts_batch_icons.html">Batch Icons</a>
                      </li>
                      <li>
                        <a href="icon_fonts_dashicons.html">Dashicons</a>
                      </li>
                      <li>
                        <a href="icon_fonts_typicons.html">Typicons</a>
                      </li>
                      <li>
                        <a href="icon_fonts_weather_icons.html">Weather Icons</a>
                      </li>
                      <li>
                        <a href="icon_fonts_light_admin.html">Light Admin</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
		


		<!--------------------
        END - Menu side compact 
        -------------------->  
  


</html>