<script>
	import { currentUser, getAvatar } from "$lib/user"
</script>

${ currentUser.name }
${ currentUser.email }
${ getAvatar(currentUser) }
