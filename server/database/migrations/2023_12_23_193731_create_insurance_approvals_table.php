<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('insurance_approvals', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('medical_record_id');
            $table->unsignedBigInteger('insurance_company_id');
            $table->boolean('approved');
            $table->timestamps();

            $table->foreign('medical_record_id')->references('id')->on('medical_records')->onDelete('cascade');
            $table->foreign('insurance_company_id')->references('id')->on('insurance_companies')->onDelete('cascade');
        });
    }

    public function down(): void {
        Schema::dropIfExists('insurance_approvals');
    }
};
