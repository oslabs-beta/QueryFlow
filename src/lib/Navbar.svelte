<script lang="ts" >
import logo from '../assets/QueryFlow-icon.png'


</script>

<div class="navbar bg-base-100 fixed top-0 z-10">
  <div class="flex-1">
    
    <a class="btn btn-ghost normal-case text-xl logo-text" href="http://localhost:5173/">
      <img src={logo} alt="logo" width="26px" />
      QueryFlow
    </a>
  </div>
  <div class="flex-none">
    <a class="navTags" href="$">About</a>
    <a class="navTags" href="$">SQL P Tips</a>
    <a class="navTags" href="$">QF GitHub</a>
    <a class="navTags" href="$">Logout</a>
    <!-- 3-dot button in top-right corner, replace all navTags with this on smaller screens -->
    <!-- <button class="btn btn-square btn-ghost">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-5 h-5 stroke-current">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z">
        </path>
      </svg>
    </button> -->
  </div>
</div>

<style>
  .navbar {
    border-bottom: 1px solid #cecece;
  }

  .navTags {
    margin-right: 25px;
  }
</style>