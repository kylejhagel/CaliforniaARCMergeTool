$(document).ready(function () {
    //Step 1:
    $('#searchUsersBtn').click(function (event) {
        //alert("Now we need to look up the users in our database and see if there are any results.");

        //While the system searches display #systemIsLookin spinner indicating something is happening
        $('#systemIsLooking').show();

        $('#searchUsersBtn').addClass('disabled');

        setTimeout(function systemLookingUpUsers() {
            $('#mergeUserResultsAlert').show();//could show us the number of records but may be redundant
            $('#mergeUserResultsDiv').show();

            $("#systemIsLooking").hide();
            $('#searchUserLookupDiv').hide();

            $('#step1').removeClass('active');
            $('#step2').addClass('active');

        }, 2000);

        event.preventDefault();
    });

    //Step 2
    if ($('input[type="checkbox"]').length >= 1) {
        $('input[type="checkbox"]').click(function () {
            if ($(this).is(":checked")) {
                $('#selectPrimaryAccountBtn').removeClass('disabled').attr('title', 'You are selecting this as the primary account.');
            }
            
        });
    }

    $('#selectPrimaryAccountBtn').click(function (event) {
        if ($("input:checkbox:checked").length === 0) {
            alert("Please select at least one primary account.");
            event.preventDefault();
        }

        if ($("input:checkbox:checked").length >= 2) {
            
            alert("Too many accounts selected. You may only select one primary account.");
            event.preventDefault();
            
        }
        else {
            $('#confirmPrimaryAccountModal').modal();

            //Things that happen in the modal accept button
            $('#confirmPrimaryAccountBtn').click(function () {
                $('#confirmPrimaryAccountModal').modal('hide');
                $('#mergeUserResultsDiv').hide();
                $('#mergeUserResultsAlert').hide();
                $('#mergeRecordsSelectDiv').show();//Shows step 3 in the merge process, selecting eligible records to merge
                $('#step2').removeClass('active');
                $('#step3').addClass('active');
            });
        }
        event.preventDefault();
    });

    //Step 3
    $('#selectMergingAccountsBtn').click(function (event) {
        //$('#confirmMergeSelectAccountsModal').modal();
        $('#confirmMergeSelectAccountsModal').modal('hide');
        $('#mergeRecordsSelectDiv').hide();
        $('#mergeConfirmRecordsSelectDiv').show();//Displays step 4 confirm merged
        $('#step3').removeClass('active');
        $('#step4').addClass('active');
    });

    //Launces a modal to confirm merging selected accounts
    $('#confirmMergeSelectAccountsBtn').click(function (event) {
        $('#confirmMergeSelectAccountsModal').modal('show');
    });

    $('#confirmMergeRecordsBtn').click(function (event) {

        $('#systemIsMerging').show();

        setTimeout(function systemMergingUsers() {
            $('#systemIsMerging').hide();
            $('#mergeConfirmRecordsSelectDiv').hide();
            $('#mergeRecordsCompleteDiv').show();
            $('#step4').removeClass('active');
            $('#step5').addClass('active');

        }, 2000);

        event.preventDefault();
    });

    //do we need primary only checkboxes
    //if ($('input.allowPrimaryCheck[type="checkbox"]').length >= 1) {
    //    $('input.allowPrimaryCheck[type="checkbox"]').click(function () {
    //        if ($(this).is(":checked")) {
    //            $('#selectPrimaryAccountBtn').removeClass('disabled').attr('title', 'You are selecting this as the primary account.');
    //        }
    //        else if ($(this).is(":not(:checked)")) {
    //            $('#selectPrimaryAccountBtn').addClass('disabled').attr('title', 'Select a primary account to continue');
    //        }
    //    });
    //}

    //do we need merging only checkboxs
    if ($('input.allowMergingCheck[type="checkbox"]').length > 0) {
        $('input.allowMergingCheck[type="checkbox"]').click(function () {
            if ($(this).is(":checked")) {
                $('#confirmMergeSelectAccountsBtn').removeClass('disabled').attr('title', 'Accept and continue.');
            }
            else if ($(this).is(":not(:checked)")) {
                $('#confirmMergeSelectAccountsBtn').addClass('disabled').attr('title', 'Do not continue');
            }
        });
    }
    else {
        // nothing is checked
    }

    //starting over now;
    $('.reload').click(function (event) {
        //$("input:checkbox").removeAttr('checked');
        location.reload();
        $('input[type=checkbox]').prop('checked', false); //clears the checkbox :checked property

        //event.preventDefault();
    });

    $('input[type="checkbox"][name="authorizeMergeAccountsCheckbox"]').click(function () {
        if ($(this).is(":checked")) {
            $("#confirmMergeRecordsBtn").removeClass("disabled").attr("title", "Accept and complete the merge process.");
        }
        else if ($(this).is(":not(:checked)")) {
            $("#confirmMergeRecordsBtn").addClass("disabled").attr("title", "Do not authorize and do not continue with the merge process.");;
        }
    });

});