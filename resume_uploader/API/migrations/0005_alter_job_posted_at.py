# Generated by Django 4.2.1 on 2023-10-13 06:38

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('API', '0004_alter_job_salary'),
    ]

    operations = [
        migrations.AlterField(
            model_name='job',
            name='posted_at',
            field=models.DateTimeField(auto_now=True),
        ),
    ]
