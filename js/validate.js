var valid=
{
    keyword:"",
    username:"",
    passwd:"",
    info:""
};

var validate={
    
    keyword:function(userId)
    {
        valid.keyword=userId.id.value;
        if(valid.keyword.length==0 || valid.keyword.replace(/^\s+|\s+$/, '').length == 0)
        {
            return "Enter the keyword.";
        }
        if(valid.keyword.length<5 || valid.keyword.length>30)
        {
            return "Please enter valid keyword.";
        }
        return true;
    },
    
    EmailValidation:function(usrNameId)
    {
        valid.username=usrNameId.id.value;
        valid.username=valid.username.toLowerCase();
        var atpos = valid.username.indexOf("@");
        var dotpos = valid.username.lastIndexOf(".");
        if(valid.username.length==0 || valid.username.replace(/^\s+|\s+$/, '').length == 0)
        {
            return "Enter the Username or Email.";
        }
        else if(atpos!=-1)
        {
            if (atpos< 1 || dotpos<atpos+2 || dotpos+2>=valid.username.length || (valid.username.length - dotpos)<2 || (valid.username.length - dotpos)>4)
            {
                return "Please enter valid email.";
            }
        }
        return true;
    },
    
    emailValid : function(emailId)
    {   //alert(JSON.stringify(emailId))
        valid.username=emailId.id.value;
        valid.username=valid.username.toLowerCase();
        var atpos = valid.username.indexOf("@");
        var dotpos = valid.username.lastIndexOf(".");
        if(valid.username.length==0 || valid.username.replace(/^\s+|\s+$/, '').length == 0)
        {
            return "Enter the Email.";
        }
        else if (atpos< 1 || dotpos<atpos+2 || dotpos+2>=valid.username.length || (valid.username.length - dotpos)<2 || (valid.username.length - dotpos)>4)
        {
                return "Please enter valid email.";
        }
        return true;
    },
    
    Password:function(passwordId)
    {
        valid.passwd=passwordId.id.value;
        if(valid.passwd.length==0)
        {
            return "Please Enter Password";
        }
        else if(valid.passwd.length<8 || valid.passwd.length>16)
        {
            return "Please Enter Password between 8-16 character";
        }
        return true;
    },

    NewPassword:function(passwordId)
    {
        valid.passwd=passwordId.id.value;
        if(valid.passwd.length==0)
        {
            return "Please Enter New Password";
        }
        else if(valid.passwd.length<8 || valid.passwd.length>16)
        {
            return "Please Enter New Password between 8-16 character";
        }
        return true;
    },
    
    blankValidation:function(val)
    {
        valid.info=val.id.value;
        if(valid.info.length==0 || valid.info.replace(/^\s+|\s+$/, '').length == 0)
        {
            return "Enter the "+val.text;
        }
        return true;
    },
    blankSelectValidation:function(val)
    {
        valid.info=val.id.value;
        if(valid.info=="")
        {
            return "Please select "+val.text;
        }
        return true;
    },
}




