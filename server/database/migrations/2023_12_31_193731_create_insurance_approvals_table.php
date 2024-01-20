<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('insurance_approvals', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('medical_histories_id');
            $table->foreign('medical_histories_id')->references('id')->on('medical_historiess')->onDelete('cascade');
            $table->unsignedBigInteger('medication_histories_id');
            $table->foreign('medication_histories_id')->references('id')->on('medication_historiess')->onDelete('cascade');
            $table->unsignedBigInteger('insurance_company_id');
            $table->foreign('insurance_company_id')->references('id')->on('insurance_companies')->onDelete('cascade');
            $table->unsignedBigInteger('lab_result_id');
            $table->foreign('lab_result_id')->references('id')->on('lab_results')->onDelete('cascade');
            $table->unsignedBigInteger('symptoms_id');
            $table->foreign('symptoms_id')->references('id')->on('symptoms')->onDelete('cascade');
            $table->unsignedBigInteger('prescription_id');
            $table->foreign('prescription_id')->references('id')->on('prescriptions')->onDelete('cascade');
            $table->unsignedBigInteger('diagnosis_id');
            $table->foreign('diagnosis_id')->references('id')->on('diagnoses')->onDelete('cascade');
            $table->boolean('approved');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('insurance_approvals');
    }
};
