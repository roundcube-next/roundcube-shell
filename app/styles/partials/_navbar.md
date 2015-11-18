# Navbar

<div class="livingstyleguide--paragraph">
  <nav class="navbar navbar-default">
    <div class="container-fluid">
      <!-- Branding and logo -->
      <div class="navbar-header">
        <a class="navbar-brand" href="#">
          <img alt="Roundcube" src="/assets/logo.png">
        </a>
      </div>
      <!-- UI for logged-in users -->
      <ul class="nav navbar-nav navbar-right">
        <li class="open">
          <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="true">
            john@doe.org
            <span class="caret"></span>
          </a>
          <ul class="dropdown-menu">
            <li><a href="#">Logout</a></li>
          </ul>
        </li>
      </ul>
    </div>
  </nav>
</div>


```html
<nav class="navbar navbar-default">
  <div class="container-fluid">
    <!-- Branding and logo -->
    <div class="navbar-header">
      <a class="navbar-brand" href="#">
        <img alt="Roundcube" src="/assets/logo.png">
      </a>
    </div>
    <!-- UI for logged-in users -->
    <ul class="nav navbar-nav navbar-right">
      <li class="open">
        <a href="#"
           class="dropdown-toggle" data-toggle="dropdown" role="button"
           aria-haspopup="true" aria-expanded="true">
          john@doe.org
          <span class="caret"></span>
        </a>
        <ul class="dropdown-menu">
          <li><a href="#">Logout</a></li>
        </ul>
      </li>
    </ul>
  </div>
</nav>
```
