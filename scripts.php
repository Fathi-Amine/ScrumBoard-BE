<?php
    //INCLUDE DATABASE FILE
    include('database.php');
    
    //SESSSION IS A WAY TO STORE DATA TO BE USED ACROSS MULTIPLE PAGES
    session_start();

    //ROUTING
    if(isset($_POST['save']))        saveTask();
    if(isset($_POST['update']))      updateTask();
    if(isset($_POST['delete']))      deleteTask();
    
    // Setting a counter
    $counter = 1;
    function getTasks()
    {
       global $conn, $counter;
        //CODE HERE
        // if($stat == '1'){
        //     $icon = "far fa-question-circle";
        // }else if($stat == '2'){
        //     $icon = "spinner-border spinner-border-sm";
        // }else{
        //     $icon = "bi bi-check-circle";
        // }
        //SQL SELECT
        $data_query = "SELECT tasks.*,priorities.name AS priorityName,
         statu_s.name AS taskStatus,
          types.name AS typeName 
          FROM tasks 
          INNER JOIN priorities ON priorities.id = tasks.priority_id 
          INNER JOIN statu_s ON statu_s.id = tasks.status_id 
          INNER JOIN types ON types.id = tasks.type_id 
        --   WHERE statu_s.id = 1
          ORDER BY id ASC";
        $result = mysqli_query($conn,$data_query);
        $tasks = mysqli_fetch_all($result, MYSQLI_ASSOC);
        return $tasks;
        }?>


<?php
    function saveTask()
    {
        global $conn;
        if(empty($_POST["title"])){
            $_SESSION['messageDanger'] = "Task can't be added. Title input is empty !";
		    header('location: index.php');
            exit();
        }else{
            $title = htmlspecialchars($_POST["title"]);
            $title = preg_replace('/\s+/', '',$title);
            if(!preg_match('/^[a-zA-Z\s]+$/', $title)){
				$_SESSION['messageDanger'] = "Title Not valid. Title must be letters only.";
		        header('location: index.php');
                exit();
            }
        }
        $type_id = $_POST['task-type'];
        $priority_id = $_POST['priority'];
        $statu_s_id = $_POST['status'];
        if(empty( $_POST['date'])){
            $task_datetime = gmdate("Y-m-d", time());
        }else {
            $task_datetime = $_POST['date'];
        }
        if(empty($_POST["description"])){
            $_SESSION['messageDanger'] = "Task can't be added. Description input is empty !";
            header('location: index.php');
            exit();
        }else{
            $description = htmlspecialchars($_POST['description']);
        }
        //CODE HERE
        $query = "INSERT INTO `tasks`(`title`, `type_id`,`priority_id`, `status_id`, `task_datetime`, `description`) 
        VALUES ('$title', '$type_id', '$priority_id', '$statu_s_id', '$task_datetime', '$description')";
        $res = mysqli_query($conn, $query);
        //SQL INSERT
        $_SESSION['message'] = "Task has been added successfully !";
		header('location: index.php');
    }

    function updateTask()
    {
        //CODE HERE
        global $conn;
        if(isset($_POST['task-id'])){
            $id = $_POST['task-id'];  
        }
        if(empty($_POST["title"])){
            $_SESSION['messageDanger'] = "Task can't be Updated. Title input is empty !";
		    header('location: index.php');
            exit();
        }else{
            $title = htmlspecialchars($_POST["title"]);
            $title = preg_replace('/\s+/', ' ',$title);
            if(!preg_match('/^[a-zA-Z\s]+$/', $title)){
				$_SESSION['messageDanger'] = "Title Not valid. Title must be letters only.";
		        header('location: index.php');
                exit();
            }
        }
        if(empty( $_POST['date'])){
            $datetime = gmdate("Y-m-d", time());
        }else {
            $datetime = $_POST['date'];
        }
        if(empty($_POST["description"])){
            $_SESSION['messageDanger'] = "Task can't be Updated. Description input is empty !";
            header('location: index.php');
            exit();
        }else{
            $description = htmlspecialchars($_POST['description']);
        }
        $type = $_POST['task-type'];
        $priority = $_POST['priority'];
        $status_id = $_POST['status'];

        $query = "UPDATE tasks SET title = '$title', `type_id` = '$type',
         priority_id = '$priority', status_id = '$status_id' , task_datetime = '$datetime', `description`='$description' WHERE id = '$id'";
        
        $res = mysqli_query($conn, $query);


        //SQL UPDATE
        $_SESSION['message'] = "Task has been updated successfully !";
		header('location: index.php');
    }

    function deleteTask()
    {
        //CODE HERE
        global $conn;

        $id = $_POST["task-id"];
        $query = "DELETE FROM TASKS WHERE `id` = $id";
        $res = mysqli_query($conn, $query);
        //SQL DELETE
        $_SESSION['message'] = "Task has been deleted successfully !";
		header('location: index.php');
    }

?>

<?php 

function selectBox($selection) {
    global $conn;

    $query = "SELECT * FROM $selection";
    $res = mysqli_query($conn, $query);

    while($row = mysqli_fetch_assoc($res))
    {
        echo "<option value='".$row["id"]."'>".$row["name"]."</option>";
    }
}


function radioTypes(){
    global $conn;
    $query = "SELECT * FROM types";
    $res = mysqli_query($conn, $query);
    
    while($row = mysqli_fetch_assoc($res)){?>

        <?php 
        if($row["name"] == "Feature"){
            $typeName = "task-type-Feature";
        }else{
            $typeName = "task-type-Bug";
        }

        if($row["name"] == "Feature"){
            $check = "checked";
        }

        ?>
        <div class="form-check mb-1">
            <input class="form-check-input" name="task-type" type="radio" value="<?php echo $row['id']?>" id="<?= $typeName?>"/>
            <label class="form-check-label" for="task-type-feature"><?php echo $row['name']?></label>
        </div>

    <?php
    }
}

function countTypes($column){
    global $conn;
    $query = "SELECT * FROM tasks WHERE status_id = $column";
    $res = mysqli_query($conn, $query);
    $count = mysqli_num_rows($res);
    echo $count;
}