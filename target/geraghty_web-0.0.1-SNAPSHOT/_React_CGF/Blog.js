function Blog() {
    return (
<div className="blog">


        <h2>Blog</h2>
        <p>
            Click <a href="docs/Geraghty_Database.pdf" target="_blank"><strong>here</strong></a> to see my database documents. 
        </p>
        <p>
            The <strong>database table</strong> will host details of user's service, service charge, and formula's for color services.
        </p>
        <ul>
            <li>formuaId: auto increment primary key</li>
            <li>serviceType: varchar</li>
            <li>colorImage: varchar</li>
            <li>appointmentDate: nullable date</li>
            <li>serviceCharge: nullable decimal</li>
            <li>formula: varchar</li>
            <li>webUserId: foreign key</li>
        </ul>

        <h2>Insert HW</h2>
        <p>
            I learned a lot in this assignment.  In particular, I enjoyed learning how to make the drop down list
            to display the user emails.  It's really interesting to me thhat so much code went into diplaying the 
            user emails.  With that being saidd, I'm happy to have that as a new tool.
        </p>

        <h2>Login/Logout HW</h2>
        <p>
            This homework took me a while to work through, but I learned so much aloong the way and it was worth the time.
            I feel like I have a much better understadning of server side code after thiss assignment.  Also, becausee of time
            I wasn't able to make a react_reusable code for the UI of the profile.  However, I'm going to conotinuee to work on
            the assignment after submission so that I can refresh on how that works too.
        </p>

        <h2>Show Data HW</h2>
        <p>
            This has been one of my favorite assignments so far because it is the first assignment that ties everything we have been 
            learning together.  There were alot of files to manage, but because of that it gave me a lot of insight.  Additionally,
            there was some fun problem solving involved in this HW like getting the code to be both sortable and filterable. One chanllenge
            that I had is that my code isn't sortabe after the it is filtered.  
        </p>
        
        <h2>Web API HW</h2>
        <p>
            I have experience writing server side database code with PHP. I used it to connect to 
            a web application that I built. My biggest taking away this week was the importance of 
            structurinng the code.  Adding the code for web API's made me aware of the importance of 
            orginization.
        </p>
        <p>
            Click <a target="_blank" href="docs/Web_API_Errors.pdf"><strong>here</strong></a> to see my Web API error document.
        </p>
        <p>
            If you would like to see my <strong>WebUser Database Access API</strong> open up in a new tab,
            click <a href="webUser/getAll" target="_blank"><strong>here</strong></a>. This code is well 
            designed and easy for the client to consume because it outputs from java objects 
            that have been converted to JSON.
        </p>
        <p>
            If you would like to see my <strong>FormulaFile Database Access API</strong> open up in a new tab,
            click <a href="formulaFile/getAll" target="_blank"><strong>here</strong></a>. This code is well 
            designed and easy for the client to consume because it outputs from java objects 
            that have been converted to JSON.
        </p>
        

    
        <p>
            I have taken a database management course at the Communnity College of Philadelphia.
            Additionally, I have incorporaated a couple different databases into a web application that
            I built for an Insurance Compaany.  I believe those databases aree hosted on AWS.
        </p>
        <p>
            I started web development this past summer. I landed an internship and was asked to build a web application.
            I really enjoyed the process and now I have started working on projects utilizing tutorials
            that I find on youtube.
        </p>
        <p>
            HW1: I think that the most difficult part of this assignment was joining the two tables.  It took some playing 
            around with for me to fully grasp the conceept.  I'm still a little unclear about the cross product, but I think
            that I was ultimateely able to submit my files correctly.
        </p>
        <p>
            HW2: This assignment was supposed to be simple, but it actually felt pretty diffiicult for me.  I don't think that the
            HW was that diffiicult in nature, but the instructions were hard to follow.  Its easier for me to follow instructions
            that are concise and in an order that makes sense.  With that said, I think I was able to work it out.
        </p>
        <p>
            HW4 Components: I realy enjoyed this weeks lab and HW assignment.  I've been wanting to learn more about REACT for awahile
            and this was the first time that I gained an understannding of the power in creating componeents.  I'm excited to learn more.
            I had some trouble with CSS. I'm not able to properly center my web componets when the screen is at a smaller size. For some reason,
            the components are slightly shifted to the right, rather than being centered.
        </p>


         

</div>
    );
}