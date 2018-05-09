Crowdcomms <code challenge>

using the sqlite base which is versioned on gitHub
sqlite user: admin
sqlite passcode: crodcomms2018

 pre-requiste.
 python and django framework installed.
 python /crowdcomms/manage.py runserver

 access URL: http://127.0.0.1:<port>/ or http://localhost:<port>/


For any other DB.

    python /crodcomms/manage.py makemigrations webapp
    python /crodcomms/manage.py migrate

    Create DB user
    python /crodcomms/manage.py createsuperuser

    --<**SHELL-PROMPT>--

    Username: <choose-your-admin-user-name>
    Password: **********
    Password (again): *********
    Superuser created successfully

    --<**SHELL-PROMPT>--

Running the project
    python /crodcomms/manage.py runserver


